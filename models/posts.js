const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    title: {type: String , required: true , minlength: 3 ,maxlength: 15 } ,
    body: {type: String , required: true , minlength: 5 ,maxlength: 140 } ,
    author: {type: mongoose.Schema.Types.ObjectId , required: true , ref: 'User'} ,
})

const postModel = mongoose.model('Post',postSchema)

module.exports = postModel