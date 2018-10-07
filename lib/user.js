var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    password: {type: String},
    permissionlvl: {type: Number}
});

var User = mongoose.model('users', userSchema);
module.exports = User;