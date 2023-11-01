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


router.post('/:postId/like', isAuthenticated, async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        
        const userId = req.user._id;
        const userIndex = post.likes.indexOf(userId);

        if (userIndex !== -1) {
            post.likes.splice(userIndex, 1);
        } else {
            post.likes.push(userId);
        }

        await post.save();

        res.json({ likes: post.likes.length });
    } catch (error) {
        console.error("Error liking the post:", error);
        res.status(500).send("Failed to like the post");
    }
});


    newPost.save()
        .then(post => {
            res.status(201).json(post);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Failed to create post' });
        });
        router.delete('/delete/:postId', isAuthenticated, async (req, res) => {
            const postId = req.params.postId;
            
            try {
                await Post.findByIdAndDelete(postId);
                res.status(200).json({ message: 'Post deleted successfully' });
            } catch (error) {
                console.error('Error deleting post:', error);
                res.status(500).send("Error deleting post");
            }
        });
         
});

module.exports = router;
