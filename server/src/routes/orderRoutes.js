const express = require('express')
const router = express.Router()
const OrderCtrl = require('../controllers/orderController')
const { protect, admin } = require('../middleware/authMiddleware')

router
    .route('/')
    .post(protect, OrderCtrl.addOrderItems)
    .get(protect, admin, OrderCtrl.getAllOrders)

router
    .route('/my_orders')
    .get(protect, OrderCtrl.getMyOrders)

router
    .route('/:id')
    .get(protect, OrderCtrl.getOrderById)

router
    .route('/:id/pay')
    .put(protect, OrderCtrl.updateOrderToPaid)

router
    .route('/:id/deliver')
    .put(protect, admin, OrderCtrl.updateOrderToDelivered)

module.exports = router