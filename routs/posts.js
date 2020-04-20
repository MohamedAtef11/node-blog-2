const express = require('express')
const postModel = require('../models/posts')
const router = express.Router()


router.get('/', async (req , res )=>{
    try {
        const posts = await postModel.find({}).populate('author')
        return res.json(posts)
        
    } catch (error) {
        res.send(error)
    }
    
})

router.get('/:id',async(req , res)=>{
    id = req.params.id
    try {
        const posts = await postModel.findById(id)
        res.json(posts)
        
    } catch (error) {
        res.send(error)
    }

})

router.post('/',async(req , res)=>{
    try {
        const posts = await postModel.create(req.body)
            return res.json(posts)
        
    } catch (error) {
        
    }
         res.send(error)
    })    

router.patch('/:id',async(req , res)=>{
    id = req.params.id
    try {
        const posts = await postModel.findByIdAndUpdate(id , req.body)
         return res.json(posts)
        
    } catch (error) {
        
        res.send(error)
    }
     
})

router.delete('/:id',async(req , res)=>{
    id = req.params.id
    try {
       const post = await postModel.deleteOne({_id: id} )
          res.json(post)
        
    } catch (error) {
        
         res.send(error)
    }
    
})


module.exports = router