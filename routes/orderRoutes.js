const express = require('express');
const { createOrder, getOrderHistory } = require('../controllers/orderController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', auth, createOrder);
router.get('/', auth, getOrderHistory);

module.exports = router;
