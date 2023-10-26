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
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnYkLenKYt3Y9y0Ayzn-zwNIdO1qvbCVXg9w&usqp=CAU"
    },
    bio: {
        type: String,
    },
    subscribers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    suscribersCount: {
        type: Number,
        default: 0
    },
    following: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    followingCount: {
        type: Number,
        default: 0
    },
    posts: [{type: Schema.Types.ObjectId, ref: 'Post'}]
  },
  {
    timestamps: true,
  }
);

userSchema.methods.subscribeTo = function(userId) {
    if (!this.following.includes(userId)) {
        this.following.push(userId);
        this.followingCount++;
    }
};

userSchema.methods.unsubscribeFrom = function(userId) {
    const index = this.following.indexOf(userId);
    if (index !== -1) {
        this.following.splice(index, 1);
        this.followingCount--;
    }
};

userSchema.methods.addSubscriber = function(userId) {
    if (!this.subscribers.includes(userId)) {
        this.subscribers.push(userId);
        this.subscribersCount++;
    }
};

userSchema.methods.removeSubscriber = function(userId) {
    const index = this.subscribers.indexOf(userId);
    if (index !== -1) {
        this.subscribers.splice(index, 1);
        this.subscribersCount--;
    }
};

module.exports = model("User", userSchema);
