var express = require('express');
var router = express.Router();
var config = require('../libs/config');
var jsModel = require('../libs/model/q_JS');

/* GET subject listing. */

//查看所有科目
router.get('/', function(req, res, next) {
    res.send('所有问题');
});


//查看JS选择题
router.get('/mcq',function (req,res) {

    jsModel.find(function (err,doc) {
        if(!err){
            res.send(doc);
        }else{
            res.send({status:500,info:err});
        }
    });
});

//JS新增选择题
router.post('/mcq',function (req,res) {
    //res.send({status:200,info:"req succeessful"});
    var jsInsert = new jsModel(JSON.parse(req.body.data));

    jsInsert.save(function (err,doc) {
        if(!err){
            res.send({status:200,info:"req succeessful"});
        }else {
            if(err.name == 'ValidationError'){
                res.statusCode = 400;
                res.send({error:'Validation error',status:400});
            }else{
                res.statusCode = 500;
                console.log({error:'Server error',status:500,info:err.message});
                res.send({error:'Server error',status:500,info:err.message});
            }
        }
    });
});

//删除某条



module.exports = router;
