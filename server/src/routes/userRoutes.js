const express = require('express')
const router = express.Router()
const UserCtrl = require('../controllers/userController')
const { protect, admin } = require('../middleware/authMiddleware')

router
    .route('/')
    .post(UserCtrl.registerUser)
    .get(protect, admin, UserCtrl.getAllUsers)

router.post('/login', UserCtrl.authUser)

router
    .route('/profile')
    .get(protect, UserCtrl.getUserProfile)
    .put(protect, UserCtrl.updateUserProfile)

router
    .route('/:id')
    .get(protect, admin, UserCtrl.getUserById)
    .put(protect, admin, UserCtrl.updatedUser)
    .delete(protect, admin, UserCtrl.deleteUser)

module.exports = router