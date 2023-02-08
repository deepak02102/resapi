const mongooes = require('mongoose');

const userSchema = new mongooes.Schema({
    username : String,
    password : String,
    phone:Number,
    email:String,
    userType:String,
});

module.exports = mongooes.model('user', userSchema);