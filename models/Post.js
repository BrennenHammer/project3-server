const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    mediaType: {
        type: String,
        enum: ['photo', 'video'],
        required: true
    },
    mediaUrl: {
        type: String,
        required: true
    },
    caption: String,
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    createdDate: {
        type: Date,
        default: Date.now
    },
    updatedDate: Date,
    location: String,
    tags: [String]
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
