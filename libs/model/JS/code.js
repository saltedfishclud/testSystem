var db = require('../../db/questionBank');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var JS = new Schema({
    question:{type:String,require:true},
    qanswer_code:{type:String,require:true},
    q_code:String,
    explain:{type:String},
    modified:{ type: Date, default: Date.now }
});

module.exports = db.model('code', JS);