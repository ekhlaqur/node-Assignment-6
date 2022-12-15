const router = require('express').Router();
const Blog = require('../models/Blog')
const bodyParser = require("body-parser")

// Your routing code goes here

// router.use(bodyParser.json())
router.get('/blog', async (req, res) => {
    // res.json({ok:'blog'})
    console.log(req.query)
    try {
        if (Object.keys(req.query).length === 0) {
            const data = await Blog.find()
            res.status(200).json({
                status: "success",
                result: data
            })
        }else{ 
         const data = await Blog.find({ topic: req.query.search })
        res.status(200).json({
            status: "success",
            result: data
        })}
      
    } catch (error) {
        res.status(400).json({
            status: "failed",
            Error: error.message
        })
    }
})
router.post('/blog', async (req, res) => {
    try {
        const data = await Blog.create(req.body)
        res.status(200).json({
            status: "success",
            result: data
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            Error: error.message
        })
    }
})
router.put('/blog/:_id', async (req, res) => {
    try {
        const data = await Blog.updateOne({ _id: req.params._id }, req.body)
        res.status(200).json({
            status: "success",
            result: data
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            Error: error.message
        })
    }
})
router.delete('/blog/:_id', async (req, res) => {
    try {
        const data = await Blog.deleteOne({ _id: req.params._id })
        res.status(200).json({
            status: "success",
            result: data
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            Error: error.message
        })
    }
})


module.exports = router;