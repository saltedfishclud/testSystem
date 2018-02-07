var mongoose = require('../db/admin');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;


var adminSchema = new Schema({
    admin:{type:String,require:true},
    password:{ type: String, required: true },
    modified:{ type: Date, default: Date.now }
});

adminSchema.pre('save', function(next) {
    var user = this;

    //产生密码hash当密码有更改的时候(或者是新密码)
    if (!user.isModified('password')) return next();

    // 产生一个salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        //  结合salt产生新的hash
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // 使用hash覆盖明文密码
            user.password = hash;
            next();
        });
    });
});

adminSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('adminUser', adminSchema);