const asyncHandler = require('express-async-handler');
const Author = require('../models/authorModel');
const Book = require('../models/bookModel');

// @desc    Fetch all authors
// @route   GET /api/authors
// @access  Public
exports.getAllAuthors = asyncHandler(async (req, res) => {
    const pageSize = 12;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword
        ? {
            name: {
                $regex: req.query.keyword,
                $options: 'i',
            },
        }
        : {};

    const count = await Author.countDocuments({ ...keyword });
    const authors = await Author.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .sort({ createdAt: -1 })

    res.json({ authors, page, pages: Math.ceil(count / pageSize), count });
})

// @desc    Fetch all authors
// @route   GET /api/authors/:id
// @access  Public
exports.getAuthorById = asyncHandler(async (req, res) => {
    const author = await Author.findById(req.params.id);
    if (author) {
        res.json(author);
    } else {
        res.status(404)
        throw new Error('Author not found');
    }
})

// @desc    Create a author
// @route   POST /api/authors
// @access  Private/Admin
exports.createAuthor = asyncHandler(async (req, res) => {
    const author = new Author({
        user: req.user._id,
        name: 'Sample name',
        about: 'Sample about',
        portrait: '/images/sample.jpg',
    });

    const createdAuthor = await author.save();

    res.status(201).json(createdAuthor);
})

// @desc    Update a author
// @route   PUT /api/authors/:id
// @access  Private/Admin
exports.updateAuthor = asyncHandler(async (req, res) => {
    const {
        name,
        about,
        portrait,
    } = req.body;

    const author = await Author.findById(req.params.id);

    if (author) {
        author.name = name;
        author.about = about;
        author.portrait = portrait;

        const keyword = name
            ? {
                author: {
                    $regex: name,
                    $options: 'i',
                },
            }
            : {};

        const count = await Book.countDocuments({ ...keyword });
        const books = await Book.find({ ...keyword })
        books.map((book) => {
            const addBook = {
                item: book._id,
                image: book.image,
                name: book.name,
            };

            const alreadyBook = author.books.find(
                (r) => r.item.toString() === addBook.item.toString()
            )

            if (!alreadyBook) {
                author.books.push(addBook);
            }
        })

        author.numBooks = count;
        const updatedAuthor = await author.save();
        res.json(updatedAuthor);
    } else {
        res.status(404);
        throw new Error('Author not found');
    }
});

// @desc    Delete a author
// @route   DELETE /api/authors/:id
// @access  Private/Admin
exports.deleteAuthor = asyncHandler(async (req, res) => {
    const author = await Author.findById(req.params.id);

    if (author) {
        await author.remove();
        res.json({ message: 'Author removed' });
    } else {
        res.status(404);
        throw new Error('Author not found');
    }
});

// @desc    Get top authors
// @route   GET /api/authors/top
// @access  Public
exports.getTopAuthors = asyncHandler(async (req, res) => {
    const authors = await Author.find({}).sort({ numBooks: -1 }).limit(4);

    res.json(authors);
})