var express = require('express');
var router = express.Router();
var mcq = require('../../libs/model/JS/mcq');
//var passport = require('passport');
var multiple = require('../../libs/model/JS/multiple');
var judge = require('../../libs/model/JS/judge');
var code = require('../../libs/model/JS/code');
var sketch = require('../../libs/model/JS/sketch');

/* GET subject listing. */

//查看所有科目
router.get('/', function(req, res, next) {
    res.send('所有问题');
});


//查看JS选择题
router.get('/mcq',function (req,res) {
    if(!req.session.isAdminLogin){
        return res.send({status:401,info:"permission denied"});
    }
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

    if(!req.session.isAdminLogin){
        return res.send({status:401,info:"permission denied"});
    }

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

    if(!req.session.isAdminLogin){
        return res.send({status:401,info:"permission denied"});
    }


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

    if(!req.session.isAdminLogin){
        return res.send({status:401,info:"permission denied"});
    }

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

    if(!req.session.isAdminLogin){
        return res.send({status:401,info:"permission denied"});
    }

    multiple.find(function (err,doc) {
        if(!err){
            res.send(doc);
        }else{
            res.send({status:500,info:err});
        }
    });
});

router.get("/multiple/:id",function(req,res) {

    if(!req.session.isAdminLogin){
        return res.send({status:401,info:"permission denied"});
    }

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

    if(!req.session.isAdminLogin){
        return res.send({status:401,info:"permission denied"});
    }

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

    if(!req.session.isAdminLogin){
        return res.send({status:401,info:"permission denied"});
    }

    var data_id = req.params.id;
    multiple.findById(data_id,function (err,doc) {
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

//判断题
router.get("/judge",function(req,res) {

    if(!req.session.isAdminLogin){
        return res.send({status:401,info:"permission denied"});
    }

    judge.find(function (err,doc) {
        if(!err){
            res.send(doc);
        }else{
            res.send({status:500,info:err});
        }
    });
});

router.get("/judge/:id",function(req,res) {

    if(!req.session.isAdminLogin){
        return res.send({status:401,info:"permission denied"});
    }

    judge.findById(req.params.id,function (err,doc) {
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

router.post("/judge",function(req,res) {

    if(!req.session.isAdminLogin){
        return res.send({status:401,info:"permission denied"});
    }

    if(!req.body.q_code){
        req.body.q_code = null;
    }
    var jsInsert = new judge(req.body);

    jsInsert.save(function (err,doc) {
        if(!err){
            res.send({status:200,info:"req succeessful"});
        }else {
            res.statusCode = 500;
            res.send({error:'Server error',status:500,info:err.message});
        }
    });
});

router.delete("/judge/:id",function(req,res) {

    if(!req.session.isAdminLogin){
        return res.send({status:401,info:"permission denied"});
    }

    var data_id = req.params.id;
    judge.findById(data_id,function (err,doc) {
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

//编程题
router.get("/code",function (req,res) {
    if(!req.session.isAdminLogin){
        return res.send({status:401,info:"permission denied"});
    }

    code.find(function (err,doc) {
        if(!err){
            res.send(doc);
        }else{
            res.send({status:500,info:err});
        }
    });
});

router.get("/code/:id",function (req,res) {
    if(!req.session.isAdminLogin){
        return res.send({status:401,info:"permission denied"});
    }

    code.findById(req.params.id,function (err,doc) {
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

router.post("/code",function (req,res) {
    if(!req.session.isAdminLogin){
        return res.send({status:401,info:"permission denied"});
    }

    if(!req.body.q_code){
        req.body.q_code = null;
    }
    var jsInsert = new code(req.body);

    jsInsert.save(function (err,doc) {
        if(!err){
            res.send({status:200,info:"req succeessful"});
        }else {
            res.statusCode = 500;
            res.send({error:'Server error',status:500,info:err.message});
        }
    });
});

router.delete("/code",function (req,res) {
    if(!req.session.isAdminLogin){
        return res.send({status:401,info:"permission denied"});
    }

    var data_id = req.params.id;
    code.findById(data_id,function (err,doc) {
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

//简答

router.get("/sketch",function (req,res) {
    if(!req.session.isAdminLogin){
        return res.send({status:401,info:"permission denied"});
    }

    sketch.find(function (err,doc) {
        if(!err){
            res.send(doc);
        }else{
            res.send({status:500,info:err});
        }
    });
});

router.get("/sketch/:id",function (req,res) {
    if(!req.session.isAdminLogin){
        return res.send({status:401,info:"permission denied"});
    }

    sketch.findById(req.params.id,function (err,doc) {
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

router.post("/sketch",function (req,res) {
    if(!req.session.isAdminLogin){
        return res.send({status:401,info:"permission denied"});
    }

    if(!req.body.q_code){
        req.body.q_code = null;
    }
    var jsInsert = new sketch(req.body);

    jsInsert.save(function (err,doc) {
        if(!err){
            res.send({status:200,info:"req succeessful"});
        }else {
            res.statusCode = 500;
            res.send({error:'Server error',status:500,info:err.message});
        }
    });
});

router.delete("/sketch",function (req,res) {
    if(!req.session.isAdminLogin){
        return res.send({status:401,info:"permission denied"});
    }

    var data_id = req.params.id;
    sketch.findById(data_id,function (err,doc) {
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

module.exports = router;


