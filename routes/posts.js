const express = require('express')
const router = express.Router()

// Load model
const Post = require('../models/Post')

// Hien thi tat ca cac posts
router.get('/', async (req, res) => {
    const posts = await Post.find().lean().sort({ date: -1 })
    res.render('posts/index', { posts: posts})
})

// Hien thi form de tao new post
router.get('/add', (req, res) => {
    res.render('posts/add')
})



// Tao post moi
router.post('/', async (req, res) => {
    const { title, text } = req.body

    let errors = []

    if(!title) errors.push({ msg: 'title required'})
    if(!text) errors.push({ msg: 'text required'})
    if(errors.length > 0) res.render('/posts/add', { title, text })
    else {
        const newPostData = { title: title, text: text }
        const newPost = new Post(newPostData)
        await newPost.save()
        res.redirect('/posts')
    }
})

// Hien thi form de user edit bai viet
router.get('/edit/:id', async (req, res) => {
    const post = await Post.findOne({ _id: req.params.id }).lean()
    res.render('posts/edit', { post })
})

// Cap nhat bai viet vao database
router.put('/:id', async (req, res) => {
    const { title, text } = req.body
    await Post.findOneAndUpdate({ _id: req.params.id }, {title, text})
    res.redirect('/posts')
})

// Xoa post
router.delete('/:id', async (req, res) => {
    await Post.findOneAndRemove({_id: req.params.id})
    res.redirect('/posts')
})

module.exports = router