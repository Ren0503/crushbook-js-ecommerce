const express = require('express')
const router = express.Router()
const PostCtrl = require('../controllers/postController')
const { protect, admin } = require('../middleware/authMiddleware')

router
    .route('/')
    .get(PostCtrl.getAllPosts)
    .post(protect, admin, PostCtrl.createPost)

router.get('/top', PostCtrl.getTopPosts);

router.route('/:id/comments').post(protect, PostCtrl.createPostComment)

router
    .route('/:id')
    .get(PostCtrl.incrementViews, PostCtrl.getPostById)
    .put(protect, admin, PostCtrl.updatePost)
    .delete(protect, admin, PostCtrl.deletePost)

module.exports = router