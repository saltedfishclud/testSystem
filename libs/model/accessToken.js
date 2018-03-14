var db = require('../db/auth_groud');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// AccessToken
var ticket = new Schema({
    userId: {
        type: String,
        required: true
    },

    ticket: {
        type: String,
        required: true
    },

    created: {
        type: Date,
        default: Date.now
    }
});

module.exports  = db.model('ticket', ticket);