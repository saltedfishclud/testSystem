var crypto = require("crypto");
var accessToken = require("../model/accessToken");

module.exports = function (userId,done) {
    var ticket = crypto.randomBytes(16).toString('hex');
    var token = new accessToken({
        userId,
        ticket
    });
    accessToken.findOne({userId},function (err,doc) {
        if(doc){
            accessToken.remove(doc,function (err) {
                token.save(function (err,token) {
                    if(err){throw err};
                    done(token);
                })
            });
        }

    });
}

