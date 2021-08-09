const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true,
    },
    avatar: {
        type: String, 
        required: true,
    },
    content: {
        type: String, 
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
}, {
    timestamps: true,
});

const postSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    comments: [commentSchema],
    numComments: {
        type: Number,
        required: true,
        default: 0,
    },
    views: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});

module.exports = Post = mongoose.model('Post', postSchema);