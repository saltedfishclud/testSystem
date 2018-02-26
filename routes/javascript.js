var express = require('express');
var router = express.Router();
var config = require('../libs/config');
var jsModel = require('../libs/model/q_JS');
var passport = require('passport');

/* GET subject listing. */

//查看所有科目
router.get('/', function(req, res, next) {
    res.send('所有问题');
});


//查看JS选择题
router.get('/mcq',function (req,res) {
    jsModel.find(function (err,doc) {
        // var data = [];
        // doc.forEach(function (el,index) {
        //     var json = {
        //         "序号":index+1,
        //         "问题":el.question,
        //         "选择项":el.options,
        //         "展示代码":el.q_code || "",
        //         "正确答案":el.rightAnswer,
        //         "解释":el.explain,
        //         "修改时间":el.modified
        //     }
        //     data.push(json);
        // });

        if(!err){
            res.send(doc);
        }else{
            res.send({status:500,info:err});
        }
    });
});

//查看具体某个题目
router.get('/mcq/:id',function (req,res) {

    jsModel.findById(req.params.id,function (err,doc) {
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
    var jsInsert = new jsModel(JSON.parse(req.body.data));

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
    jsModel.findById(data_id,function (err,doc) {
        if(err){
            res.statusCode = 500;
            return res.send({error:'Server error',status:500,info:err.message});
        }
        if (!doc){
            return res.send({error:'Not found'});
        }
        return doc.remove(function (err) {
            if(!err){
                res.send({status:'DELETE OK'})
            }else{
                res.statusCode = 500;
                return res.send({error:'Server error',code:500})
            }
        });
    });
});




module.exports = router;
