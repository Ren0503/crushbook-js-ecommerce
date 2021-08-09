const express = require('express');
const router = express.Router();
const AuthorCtrl = require('../controllers/authorController');
const { protect, admin } = require('../middleware/authMiddleware');

router
    .route('/')
    .get(AuthorCtrl.getAllAuthors)
    .post(protect, admin, AuthorCtrl.createAuthor)

router.get('/top', AuthorCtrl.getTopAuthors)

router
    .route('/:id')
    .get(AuthorCtrl.getAuthorById)
    .put(protect, admin, AuthorCtrl.updateAuthor)
    .delete(protect, admin, AuthorCtrl.deleteAuthor)

module.exports = router;