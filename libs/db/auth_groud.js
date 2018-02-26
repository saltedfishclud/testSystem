const mongoose = require('mongoose');
const config = require('../config');

const db = mongoose.createConnection(config.get('mongoose:auth_group'));


db.on('error',(err)=>{
    console.log("认证数据库连接失败",err.message);
});

db.once('open',()=>{
    console.log("认证数据库连接成功")
});

module.exports = db;
