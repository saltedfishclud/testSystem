const mongoose = require('../db/questionBank');
var Schema = mongoose.Schema;


var JS = new Schema({
    question:{type:String,require:true},
    q_code:String,
    options:{type:Array,require:true},
    rightAnswer:{type:String,require:true},
    explain:{type:String,require:true},
    modified:{ type: Date, default: Date.now },
    adminUser:{type:String,require:true},
});

module.exports = mongoose.model('JS_question', JS);