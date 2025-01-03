const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    categories: {
        type: Array,
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    comments: [
        {
            comment: String,
            commentator: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            commentLikes: Number,
            commentDislikes: Number,
        }
    ]
}, {
    timestamps: true 
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;