var db = require('../db/auth_groud');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// AccessToken
var AccessToken = new Schema({
    adminId: {
        type: String,
        required: true
    },

    clientId: {
        type: String,
        required: true
    },

    token: {
        type: String,
        unique: true,
        required: true
    },

    created: {
        type: Date,
        default: Date.now
    }
});

module.exports  = db.model('AccessToken', AccessToken);