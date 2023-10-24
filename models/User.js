const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    profilePicture: {
        type: String,
        default: 'path_to_default_image.jpg'
    },
    bio: {
        type: String,
    },
    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    following: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    posts: [{type: Schema.Types.ObjectId, ref: 'Post'}]
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);