var config = require('./libs/config');
var Client = require('./libs/model/client');
var AccessToken = require('./libs/model/accessToken');
var RefreshToken = require('./libs/model/refreshToken');

Client.remove({}, function(err) {
    var client = new Client({
        name: config.get("default:client:name"),
        clientId: config.get("default:client:clientId"),
        clientSecret: config.get("default:client:clientSecret")
    });

    client.save(function(err, client) {

        if(!err) {
            console.log("New client - %s:%s", client.clientId, client.clientSecret);
        } else {
            return console.log(err);
        }

    });
});

AccessToken.remove({}, function (err) {
    if (err) {
        return console.log(err);
    }
});

RefreshToken.remove({}, function (err) {
    if (err) {
        return console.log(err);
    }
});

