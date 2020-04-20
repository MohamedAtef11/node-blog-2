const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    firstname: {type: String , required: true , minlength: 2 ,maxlength: 15 } ,
    lastname: {type: String , required: true , minlength: 2 ,maxlength: 15 } ,
    pass: {type: String , required: true , minlength: 8  } ,
    gender: {type: String , required: true ,enum: ['male','female'] } ,
    mail: {type: String , unique: true , required: true , match: /.+@.+\..+/ } ,
    phone: {type: Number , required: true , minlength: 11 ,maxlength: 11 } 
})

const userModel = mongoose.model('User' , userSchema)

module.exports = userModel