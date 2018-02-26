var oauth2orize = require('oauth2orize');
var passport = require('passport');
var crypto = require('crypto');
var config = require('../config');
var Admin = require('../model/admin_group');
var AccessToken = require('../model/accessToken');
var RefreshToken = require('../model/refreshToken');


var aserver = oauth2orize.createServer();

var errFn = function (cb, err) {
    if (err) {
        return cb(err);
    }
};

var generateTokens = function (data, done) {

    var errorHanler = errFn.bind(undefined,done)
    AccessToken.remove(data,errorHanler);
    var tokenValue = crypto.randomBytes(32).toString('hex');
    data.token = tokenValue;

    var token = new AccessToken(data)
    token.save(function (err) {
        if(err){
            console.log(err);
            return done(err);
        }
        done(null,tokenValue,{
            "expires_in":config.get('security:tokenLife')
        });
    })
};



aserver.exchange(oauth2orize.exchange.password(function(client, admin, password, scope, done) {
    Admin.findOne({ admin }, function(err, doc) {
        if (err) {
            return done(err);
        }
        if (!doc) {
            return done(null, false);
        }
        doc.comparePassword(password,function (err,isMatch) {
            if(err){throw err};
            if(!isMatch){
                return done(null,false);
            }
        });

        var model = {
            adminId: doc.id,
            clientId: client.clientId
        };
        generateTokens(model, done);
    });

}));
// aserver.exchange(oauth2orize.exchange.refreshToken(function(client, refreshToken, scope, done) {
//     RefreshToken.findOne({ token: refreshToken, clientId: client.clientId }, function(err, token) {
//         if (err) {
//             return done(err);
//         }
//         if (!token) {
//             return done(null, false);
//         }
//
//         User.findById(token.userId, function(err, user) {
//             if (err) { return done(err); }
//             if (!user) { return done(null, false); }
//
//             var model = {
//                 userId: user.userId,
//                 clientId: client.clientId
//             };
//             generateTokens(model, done);
//         });
//     });
// }));



exports.token = [
    passport.authenticate(['basic', 'oauth2-client-password'], { session: false }),
    aserver.token()
];
