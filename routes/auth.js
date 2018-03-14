var express = require('express');
var router = express.Router();
var ticket = require("../libs/tool/createTicket");

router.post('/', function(req, res, next) {
    var userName = req.body.userName,
        passWord = req.body.password;


    if (userName == "630074894" && passWord == "123456") {
        var userID = "2ebd55b259f21d7efb81bdfaba586cec";
        ticket(userID,function (token) {
            return res.send({statusCode:200,ticket:token});
        });
    }else{
        res.send({info:"User does not exist or password error"});
    };

});

module.exports = router;
