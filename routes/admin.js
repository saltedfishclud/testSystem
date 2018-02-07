var express = require('express');
var router = express.Router();
var adminModel = require('../libs/model/admin_group');

/* GET admin listing. */
router.get('/', function(req, res) {
    var adminUser = req.session.admin;
    if(req.session.isLogin){
        res.render('admin/admin',{adminUser});
    }else{
        res.redirect('/admin/login');
    }
});

router.get('/login',function (req,res) {
    if(req.session.isLogin){
        res.redirect('/admin');
    }else{
        res.render('admin/adminlogin');
    }

})
//执行登陆
router.post('/dologin',function (req,res) {
    var admin = req.body.admin,
        password = req.body.pwd;
    adminModel.findOne({admin},function (err,doc) {
        if(err){
            res.statusCode = 500;
            return res.send({error:'Server error',status:500,info:err.message});
        }
        if (!doc){
            return res.send({error:'Not found'});
        }
        doc.comparePassword(password,function (err,isMatch) {
            if (err)throw err;
            if (isMatch){
                req.session.isLogin = isMatch;
                req.session.admin = doc.admin;
            }
            res.redirect('/admin');
        });
    });
});


module.exports = router;
