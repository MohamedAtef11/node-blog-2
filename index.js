const express = require('express')
const mongoose = require('mongoose')
const usersRouter = require('./routs/users.js')
const postsRouter = require('./routs/posts.js')
const signinRouter = require('./routs/signin')
const signupRouter = require('./routs/signup')

const log = require('./midlewares/log')
const logReqBody = require('./midlewares/logReqBody')
const signincheck = require('./midlewares/signincheck')
const cookieParser = require('cookie-parser')


const port = 5002
mongoose.connect('mongodb://localhost:27017/blog', {useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex: true },(err)=>{
    if (!err) return console.log("connected to db successfully");
    console.log(err)
})
const app = express()
mongoose.set('useFindAndModify', false);
app.use (express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(log)
app.use(logReqBody)
app.use('/signin',signinRouter)
app.use('/signup',signupRouter)
app.use(signincheck)
app.use('/users',usersRouter)
app.use('/posts',postsRouter)
app.listen(port , (err)=>{
    if(!err) return console.log(`server start at port ${port}`);
    console.log(err);
})

