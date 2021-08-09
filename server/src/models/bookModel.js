const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true,
    },
    avatar: {
        type: String, 
        required: true,
    },
    rating: {
        type: Number, 
        required: true,
    },
    comment: {
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

const bookSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    genres: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    publishedAt: {
        type: String,
        required: true,
    },
    publisher: {
        type: String,
        required: true,
    },
    pages: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    reviews: [reviewSchema],
    rating: {
        type: Number,
        required: true,
        default: 0,
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    sales: {
        type: Number,
        default: 0
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0,
    }
}, {
    timestamps: true
});

module.exports = Book = mongoose.model('Book', bookSchema);