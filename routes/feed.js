const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const isAuthenticated = require('../middleware/isAuthenticated')
router.get('/', (req, res) => {
    Post.find()
        .populate('author')
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

router.post('/', isAuthenticated, (req, res) => {
    const { description, file } = req.body;
    console.log('this is body', req.body)
    const userId = req.user._id;
    const mediaType = 'photo'; // assuming everything is a photo

    const newPost = new Post({
        author: userId,            
        mediaType: mediaType,     
        mediaUrl: file,       
        caption: description      
    });

    newPost.save()
        .then(post => {
            res.status(201).json(post);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Failed to create post' });
        });
});

module.exports = router;
