var url = typeof window === 'undefined' ? 'http://example.org' : location.href;
var httpinvoke = require('../httpinvoke-node');

describe('sequence of callback options', function() {
    this.timeout(10000);
    it('ensures that "uploading" is called before "gotStatus"', function(done) {
        var uploading = false;
        httpinvoke(url, {
            uploading: function() {
                uploading = true;
            },
            gotStatus: function() {
                if(done === null) {
                    return;
                }
                if(uploading) {
                    done();
                } else {
                    done(new Error('"gotStatus" was called before "uploading"'));
                }
                done = null;
            }
        });
    });
    it('ensures that "gotStatus" is called before "downloading"', function(done) {
        var gotStatus = false;
        httpinvoke(url, {
            gotStatus: function() {
                gotStatus = true;
            },
            downloading: function() {
                if(done === null) {
                    return;
                }
                if(gotStatus) {
                    done();
                } else {
                    done(new Error('"downloading" was called before "gotStatus"'));
                }
                done = null;
            }
        });
    });
    it('ensures that "downloading" is called before "finished"', function(done) {
        var downloading = false;
        httpinvoke(url, {
            downloading: function() {
                downloading = true;
            },
            finished: function() {
                if(done === null) {
                    return;
                }
                if(downloading) {
                    done();
                } else {
                    done(new Error('"finished" was called before "downloading"'));
                }
                done = null;
            }
        });
    });
});
