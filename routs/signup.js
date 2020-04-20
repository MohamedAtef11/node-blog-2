const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()
const userModel = require('../models/users')
const jwtKey = 'my_secret_key'
const jwtExpirySeconds = 300

router.post('/',async(req, res , next)=>{
    try {
        const jwt = require('jsonwebtoken')
        
        const mail = req.body.mail
        const user = await userModel.create(req.body)
        const token = jwt.sign({ mail }, jwtKey, {
           algorithm: 'HS256',
           expiresIn: jwtExpirySeconds
       })
       console.log('token:', token)
       res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000 })
       console.log(res.cookie.token);
       
       return res.json(user)
       
    } catch (error) {
        
        res.send(error)
    }
    next()

})


module.exports = router