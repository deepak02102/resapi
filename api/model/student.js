const mongooes = require("mongoose");

const studentschema = new mongooes.Schema({
    _id:mongooes.Schema.Types.ObjectId,
    name:String,
    email:String,
    mobile_number:Number,
    gender:String,
    age:Number
})

module.exports = mongooes.model('Student', studentschema)