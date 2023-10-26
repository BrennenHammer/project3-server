const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const isAuthenticated = require('../middleware/isAuthenticated');

router.get('/posts', isAuthenticated, (req, res) => {
  const userId = req.query.userId;
  
  if (userId) {
    Post.find({ author: userId })
        .populate('author', 'name')
        .then(posts => res.json(posts))
        .catch(error => res.status(500).send(error));
  } else {
    res.status(400).json({ message: 'UserId is required.' });
  }
});


router.put('/like/:postId', isAuthenticated, (req, res) => {
    const postId = req.params.postId;
    const userId = req.user._id;

    Post.findById(postId)
        .then(post => {
            if (!post.likes.includes(userId)) {
                post.likes.push(userId);
                return post.save();
            } else {
                return res.status(400).json({ message: 'Already liked.' });
            }
        })
        .then(updatedPost => res.json(updatedPost))
        .catch(error => res.status(500).send(error));
});

module.exports = router;
