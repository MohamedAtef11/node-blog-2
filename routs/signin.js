const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()
const userModel = require('../models/users')
const postModel = require('../models/posts')
const jwtKey = 'my_secret_key'
const jwtExpirySeconds = 300

router.post('/', async (req , res ,next)=>{
        try {
            const mail = req.body.mail            
            const token = jwt.sign({ mail }, jwtKey, {
               algorithm: 'HS256',
               expiresIn: jwtExpirySeconds
           })
           console.log('token:', token)
           res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000 })
           const posts = await userModel.find({})
           return res.json(posts)
        } catch (error) {
            res.send(error)
            next()
        }
        
    })
    


module.exports = router