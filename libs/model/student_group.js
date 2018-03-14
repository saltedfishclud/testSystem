var db = require('../db/student');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var student = new Schema({
    qq:{type:Number,required:true},
    userName:{type:String,required:true},
    password:{ type: String, required: true },
    performanceId:{type:String,required:true},
    TZuser:{type:String,required:true}
});




module.exports = db.model("student",student);


