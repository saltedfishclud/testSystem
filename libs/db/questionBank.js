const mongoose = require('mongoose');
const config = require('../config');

mongoose.connect(config.get('mongoose:admin'));

const db = mongoose.connection;

db.on('error',(err)=>{
    console.log("题库数据库连接失败",err.message);
});

db.once('open',()=>{
    console.log("题库数据库连接成功")
});

module.exports = mongoose;

