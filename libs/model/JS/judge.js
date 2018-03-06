var db = require('../../db/questionBank');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var JS = new Schema({
    question:{type:String,require:true},
    q_code:String,
    result:{type:Boolean,require:true},
    explain:{type:String,require:true},
    modified:{ type: Date, default: Date.now }
});

module.exports = db.model('judge', JS);