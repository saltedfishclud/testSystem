var mongoose = require('../db/auth_groud');
var Schema = mongoose.Schema;

var Client = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    clientId: {
        type: String,
        unique: true,
        required: true
    },
    clientSecret: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Client', Client);
