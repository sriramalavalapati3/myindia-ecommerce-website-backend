const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    "name":{type:String,
        required:true
    },
    "email":{
        type:String,
        required:true,
        unique:true
    },
    "password":{
        type:String,
        required:true,
    },
    "address":{
         type:String,
    },
    "userType":{
        type:String,
    }
})

module.exports = {userSchema}