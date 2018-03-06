var express = require('express');
var router = express.Router();
var config = require('../libs/config');
var mcq = require('../libs/model/JS/mcq');
var passport = require('passport');
var multiple = require('../libs/model/JS/multiple');

/* GET subject listing. */

//查看所有科目
router.get('/', function(req, res, next) {
    res.send('所有问题');
});


//查看JS选择题
router.get('/mcq',function (req,res) {
    mcq.find(function (err,doc) {
        if(!err){
            res.send(doc);
        }else{
            res.send({status:500,info:err});
        }
    });
});

//查看具体某个题目
router.get('/mcq/:id',function (req,res) {

    mcq.findById(req.params.id,function (err,doc) {
        if(err){
            res.statusCode = 500;
            return res.send({error:'Server error',status:500,info:err.message});
        }
        if(!doc){
            return res.send({error:'Not found'});
        }
        return res.send(doc);
    });

});

//JS新增选择题
router.post('/mcq',function (req,res) {
    //res.send({status:200,info:"req succeessful"});
    req.body.options = req.body.options.split(',');

    if(!req.body.q_code){
        req.body.q_code = null;
    }

    var jsInsert = new mcq(req.body);

    jsInsert.save(function (err,doc) {
        if(!err){
            res.send({status:200,info:"req succeessful"});
        }else {
            res.statusCode = 500;
            res.send({error:'Server error',status:500,info:err.message});
        }
    });
});

//删除某条
router.delete('/mcq/:id',function (req,res) {
    var data_id = req.params.id;
    mcq.findById(data_id,function (err,doc) {
        if(err){
            res.statusCode = 500;
            return res.send({error:'Server error',status:500,info:err.message});
        }
        if (!doc){
            return res.send({error:'Not found'});
        }
        return doc.remove(function (err) {
            if(!err){
                res.send({status:true});
            }else{
                res.statusCode = 500;
                return res.send({error:'Server error',code:500})
            }
        });
    });
});

//多选题
router.get("/multiple",function(req,res) {
    multiple.find(function (err,doc) {
        if(!err){
            res.send(doc);
        }else{
            res.send({status:500,info:err});
        }
    });
});

router.get("/multiple/:id",function(req,res) {
    multiple.findById(req.params.id,function (err,doc) {
        if(err){
            res.statusCode = 500;
            return res.send({error:'Server error',status:500,info:err.message});
        }
        if(!doc){
            return res.send({error:'Not found'});
        }
        return res.send(doc);
    });
});

router.post("/multiple",function(req,res) {
    if(!req.body.q_code){
        req.body.q_code = null;
    }
    var jsInsert = new multiple(req.body);

    jsInsert.save(function (err,doc) {
        if(!err){
            res.send({status:200,info:"req succeessful"});
        }else {
            res.statusCode = 500;
            res.send({error:'Server error',status:500,info:err.message});
        }
    });
});

router.delete("/multiple/:id",function(req,res) {

});

//判断题
router.get("/judge",function(req,res) {

});

router.get("/judge",function(req,res) {

});

router.post("/judge",function(req,res) {

});

router.delete("/judge",function(req,res) {

});



module.exports = router;
