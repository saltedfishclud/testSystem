var adminModel = require('../../libs/model/admin_group');

var admin = new adminModel({
    admin:'xiaolong',
    password:'123456'
});

// admin.save(function(err) {
//     if (err) throw err;
//
//     console.log('保存成功');
// });

// adminModel.findOne({ admin: 'xiaolong' }, function(err, doc) {
//     if (err) throw err;
//
//     // test a matching password
//     doc.comparePassword('123456', function(err, isMatch) {
//         if (err) throw err;
//         console.log('123456:', isMatch); // -> Password123: true
//     });
//
//    // test a failing password
//     doc.comparePassword('123Password', function(err, isMatch) {
//         if (err) throw err;
//         console.log('123Password:', isMatch); // -> 123Password: false
//     });
// });