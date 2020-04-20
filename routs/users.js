const express = require('express')
const router = express.Router()
const userModel = require('../models/users')
const postModel = require('../models/posts')


router.get('/',async(req, res )=>{
    try {
        const user = await userModel.find({})
        return res.json(user)
        
    } catch (error) {
        
        return res.send(error)
    }
})

router.get('/:id',async(req , res)=>{
    id = req.params.id
    try {
        
       const user = await userModel.findById(id)
       return res.json(user)
    }
        
     catch (error) {
        
         res.send(error)
   }
})


router.patch('/:id',async(req, res)=>{
    id = req.params.id
    try {
            const user = await userModel.findByIdAndUpdate(id,req.body)
            return res.json(user)
        
    } catch (error) {
        
        res.send(error)
    }
})

router.delete('/:id',async(req, res)=>{
    id = req.params.id
    const posts  = await postModel.find({ author : id})
    try {
        if(posts.length != 0){
             const post = await postModel.deleteOne({author: id} )
             const user = await userModel.deleteOne({ _id: id})
             return res.json(user)

        }
        else{
            const user = await userModel.deleteOne({ _id: id})
            return res.json(user)
        }
 
    } catch (error) {
        
        res.send(error)
    }
})

router.get('/:id/posts',async (req, res)=>{
    id = req.params.id
    try {
        const post  = await postModel.find({ author : id})
        return res.json(post)
        
    } catch (error) {
        res.send(error)

    }
})

module.exports = router