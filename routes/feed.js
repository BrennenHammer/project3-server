const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.get('/', (req, res) => {
    Post.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

router.post('/', (req, res) => {
    const { user, description, imageUrl } = req.body;

    const mediaType = 'photo'; // assuming everything is a photo

    const newPost = new Post({
        author: user,            
        mediaType: mediaType,     
        mediaUrl: imageUrl,       
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
