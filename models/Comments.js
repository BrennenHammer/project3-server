const { Schema, model } = require('mongoose')


const commentSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post', 
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});


module.exports = model("comment", commentSchema)
