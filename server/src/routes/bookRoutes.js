const express = require('express')
const router = express.Router()
const BookCtrl = require('../controllers/bookController')
const { protect, admin } = require('../middleware/authMiddleware')

router
    .route('/')
    .get(BookCtrl.getAllBooks)
    .post(protect, admin, BookCtrl.createBook)

router.route('/:id/reviews').post(protect, BookCtrl.createBookReview)

router.get('/top', BookCtrl.getTopBooks)

router.get('/releases', BookCtrl.getNewReleasesBook)

router.get('/sales', BookCtrl.getSalesBook)

router
    .route('/:id')
    .get(BookCtrl.getBookById)
    .put(protect, admin, BookCtrl.updateBook)
    .delete(protect, admin, BookCtrl.deleteBook)

module.exports = router