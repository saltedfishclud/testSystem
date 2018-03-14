var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var admin = require('./routes/admin');
var index = require('./routes/index');
var student = require('./routes/student');
var javascript = require('./routes/subject/javascript');
var auth = require("./routes/auth");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(passport.initialize());

app.use(session({
    secret: parseInt(Math.random()*10000).toString(),
    name: 'name',
    cookie: {maxAge: 6000000},
    resave: false,
    saveUninitialized: true,
}));


//首页
app.use('/', index);

app.use('/admin', admin);

//用户
app.use('/student', student);

//题库v1.0版本
app.use('/v1_0/javascript',javascript);

//学生访问ticket请求
app.use("/auth",auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  console.log(err.message);
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('500');
});

module.exports = app;
