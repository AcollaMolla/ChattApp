const crypto = require('crypto');

module.exports = {
    HashUsername: function(username){
        var shasum = crypto.createHash('sha1');
        shasum.update(username);
        return shasum.digest('hex');
    }
};