var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/view', function(req, res, next) {
  if(req.session.isStuLogin){
      res.render('student/student');
  }else {
      res.redirect("/student/login")
  }
});

router.get('/login', function(req, res, next) {
    res.render("student/studentLogin");
});



router.post('/doLogin', function(req, res, next) {

});



module.exports = router;
