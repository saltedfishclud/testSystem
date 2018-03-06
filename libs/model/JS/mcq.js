var db = require('../../db/questionBank');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var JS = new Schema({
    question:{type:String,require:true},
    q_code:String,
    options:{type:Array,require:true},
    rightAnswer:{type:String,require:true},
    explain:{type:String,require:true},
    modified:{ type: Date, default: Date.now }
});

module.exports = db.model('mcq', JS);