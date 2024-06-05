const express = require('express');
const { getCart, addToCart, removeFromCart } = require('../controllers/cartController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', auth, getCart);
router.post('/', auth, addToCart);
router.delete('/', auth, removeFromCart);

module.exports = router;
