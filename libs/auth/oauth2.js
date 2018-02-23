var oauth2orize = require('oauth2orize');
var passport = require('passport');
var crypto = require('crypto');
var admin = require('../model/admin_group');
var AccessToken = require('../model/accessToken');
var RefreshToken = require('../model/refreshToken');


var aserver = oauth2orize.createServer();

var errFn = function (cb, err) {
    if (err) {
        return cb(err);
    }
};

var generateTokens = function (data, done) {

    var errorHandler = errFn.bind(undefined, done),
        refreshToken,
        refreshTokenValue,
        token,
        tokenValue;

    RefreshToken.remove(data, errorHandler);
    AccessToken.remove(data, errorHandler);

    tokenValue = crypto.randomBytes(32).toString('hex');
    refreshTokenValue = crypto.randomBytes(32).toString('hex');

    data.token = tokenValue;
    token = new AccessToken(data);
    data.token = refreshTokenValue;
    refreshToken = new RefreshToken(data);

    refreshToken.save(errorHandler);

    token.save(function (err) {
        if (err) {

            log.error(err);
            return done(err);
        }
        done(null, tokenValue, refreshTokenValue, {
            'expires_in': config.get('security:tokenLife')
        });
    });
};



aserver.exchange(oauth2orize.exchange.password(function(client, admin, password, scope, done) {
    console.log(admin,password);
    admin.findOne({ admin:username }, function(err, doc) {

        if (err) {
            return done(err);
        }
        if (!admin || !admin.comparePassword(password)) {
            return done(null, false);
        }

        var model = {
            adminId: admin.adminId,
            clientId: client.clientId
        };
        generateTokens(model, done);
    });

}));
aserver.exchange(oauth2orize.exchange.refreshToken(function(client, refreshToken, scope, done) {

    RefreshToken.findOne({ token: refreshToken, clientId: client.clientId }, function(err, token) {
        if (err) {
            return done(err);
        }
        if (!token) {
            return done(null, false);
        }

        User.findById(token.userId, function(err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }

            var model = {
                userId: user.userId,
                clientId: client.clientId
            };
            generateTokens(model, done);
        });
    });
}));



exports.token = [
    passport.authenticate(['basic', 'oauth2-client-password'], { session: false }),
    aserver.token(),
    aserver.errorHandler()
];
