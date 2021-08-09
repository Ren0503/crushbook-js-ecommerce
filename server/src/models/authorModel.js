const mongoose = require('mongoose');

const authorSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    name: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true,
    },
    portrait: {
        type: String,
        required: true,
    },
    numBooks: {
        type: Number,
        required: true,
        default: 0,
    },
    books: [{
        item: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Book',
        },
        image: {
            type: String, 
            required: true
        },
        name: {
            type: String, 
            required: true
        }
    }],
}, {
    timestamps: true,
});

module.exports = Author = mongoose.model('Author', authorSchema);