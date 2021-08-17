const asyncHandler = require('express-async-handler');
const Book = require('../models/bookModel');
const Author = require('../models/authorModel');

// @desc    Fetch all books
// @route   GET /api/books
// @access  Public
exports.getAllBooks = asyncHandler(async (req, res) => {
    const pageSize = 12;
    const page = Number(req.query.pageNumber) || 1;
    const sort = req.query.sort || '-createdAt';

    const count = await Book.countDocuments({});
    const books = await Book.find({})
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .sort(sort)

    res.json({ books, page, pages: Math.ceil(count / pageSize), count });
});

// @desc    Fetch single book
// @route   GET /api/books/:id
// @access  Public
exports.getBookById = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);

    if (book) {
        res.json(book);
    } else {
        res.status(404)
        throw new Error('Book not found');
    }
});

// @desc    Create a book
// @route   POST /api/books
// @access  Private/Admin
exports.createBook = asyncHandler(async (req, res) => {
    const book = new Book({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        author: 'Sample author',
        genres: 'Sample genres',
        language: 'Sample language',
        publishedAt: 'Sample Published at',
        publisher: 'Sample Publisher',
        pages: 0,
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description',
    });

    const createdBook = await book.save();
    res.status(201).json(createdBook);
});

// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Private/Admin
exports.updateBook = asyncHandler(async (req, res) => {
    const {
        name,
        price,
        description,
        image,
        author,
        genres,
        language,
        publishedAt,
        publisher,
        pages,
        sales,
        countInStock,
    } = req.body;

    const book = await Book.findById(req.params.id);

    if (book) {
        book.name = name;
        book.price = price;
        book.description = description;
        book.image = image;
        book.author = author;
        book.genres = genres;
        book.language = language;
        book.publishedAt = publishedAt;
        book.publisher = publisher;
        book.pages = pages;
        book.sales = sales;
        book.countInStock = countInStock;

        const updatedBook = await book.save();

        const authorOfBook = await Author.findOne({ name: book.author });

        if (authorOfBook) {
            const addBook = {
                item: updatedBook._id,
                image: updatedBook.image,
                name: updatedBook.name,
            };

            const alreadyBook = authorOfBook.books.find(
                (r) => r.item.toString() === addBook.item.toString()
            );

            if (!alreadyBook) {
                authorOfBook.books.push(addBook);
            }

            authorOfBook.numBooks = authorOfBook.books.length;
            await authorOfBook.save();
        }

        res.json(updatedBook);
    } else {
        res.status(404);
        throw new Error('Book not found');
    }
});

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private/Admin
exports.deleteBook = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);

    if (book) {
        await book.remove();
        res.json({ message: 'Book removed' });
    } else {
        res.status(404);
        throw new Error('Book not found');
    }
});

// @desc    Create new review
// @route   POST /api/books/:id/reviews
// @access  Private
exports.createBookReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const book = await Book.findById(req.params.id);

    if (book) {
        const alreadyReviewed = book.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
        );

        if (alreadyReviewed) {
            res.status(400);
            throw new Error('Book already reviewed');
        }

        const review = {
            name: req.user.name,
            avatar: req.user.avatar,
            rating: Number(rating),
            comment,
            user: req.user._id,
        };

        book.reviews.push(review);
        book.numReviews = book.reviews.length;

        book.rating = book.reviews.reduce((acc, item) => item.rating + acc, 0) / book.reviews.length;

        await book.save();
        res.status(201).json({ message: 'Review added' });
    } else {
        res.status(404);
        throw new Error('Book not found');
    }
});

// @desc    Get top rated books
// @route   GET /api/books/top
// @access  Public
exports.getTopBooks = asyncHandler(async (req, res) => {
    const books = await Book.find({}).sort({ rating: -1 }).limit(3);

    res.json(books);
});

// @desc    Get new releases books
// @route   GET /api/books/related
// @access  Public
exports.getNewReleasesBook = asyncHandler(async (req, res) => {
    const books = await Book.find({})
        .limit(5)
        .sort({ createdAt: -1 })

    res.json(books);
});

// @desc    Get sales books
// @route   GET /api/books/sales
// @access  Public
exports.getSalesBook = asyncHandler(async (req, res) => {
    const books = await Book.find({})
        .limit(4)
        .sort({ sales: -1 })

    res.json(books);
});

// @desc    search books
// @route   GET /api/books
// @access  Public
exports.searchBooks = asyncHandler(async (req, res) => {
    const keyword = req.query.keyword
        ? {
            name: {
                $regex: req.query.keyword,
                $options: 'i',
            },
        }
        : {};

    const genres = req.query.genres
        ? {
            genres: {
                $regex: req.query.genres,
                $options: 'i',
            },

        }
        : {};

    const rate = req.query.rate
        ? {
            rating: {
                $eq: req.query.rate,
            },

        }
        : {};

    const price = req.query.bottom && req.query.top
        ? {
            price: {
                $gte: req.query.bottom,
                $lte: req.query.top,
            }
        } : {};

    const count = await Book.countDocuments({ ...keyword, ...genres, ...rate, ...price });
    const books = await Book.find({ ...keyword, ...genres, ...rate, ...price }).sort({ createdAt: -1 })

    res.json({ books, count });
});