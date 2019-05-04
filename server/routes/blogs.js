const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

router.get('/featured', (req, res) => {
    Blog
        .find({featured:true})
        .then(blogs => {
            res.status(200).json(blogs);
        });
});

router.get('/:id', (req,res) => {
    Blog
        .findById(req.params.id, (err, blog) => {
            if (blog != null){
                res.status(200).json(blog);
            }else{
                res.status(404).send('Blog not found.');
            }
            
        });
});

router.get('/', (req, res) => {
    Blog
        .find()
        .then(blogs => {
            res.status(200).json(blogs);
        });
});

router.post('/', (req,res) => {
    var blog = new Blog({
        title: req.body.title,
        article: req.body.article,
        published: req.body.published,
        featured: req.body.featured,
        author: req.body.author
    });
    blog
        .save(function (err, result) {
            if (err) return handleError(err);
            res.status(201).send(result);
    });
});

router.put('/:id', (req,res) => {
    var id = req.params.id;
    Blog
        .findByIdAndUpdate(id, {
            title: req.body.title,
            article: req.body.article,
            published: req.body.published,
            featured: req.body.featured,
            author: req.body.author
        }, (err, result) => {
            if (err) return handleError(err);
            res.status(204).send(result);
        });
});

router.delete('/:id',(req,res) => {
    var id = req.params.id;
    Blog
        .findByIdAndRemove(id, (err, result) => {
            if (err) return handleError(err);
            res.status(200).send(result);
        });
});

module.exports = router;