const Order = require('../models/Order');
const Cart = require('../models/Cart');

exports.createOrder = async (req, res) => {
  const { shippingAddress, paymentMethod } = req.body;

  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate('products.productId');

    if (!cart) {
      return res.status(400).json({ message: 'No items in cart' });
    }

    const totalPrice = cart.products.reduce((acc, item) => acc + item.productId.price * item.quantity, 0);

    const order = new Order({
      userId: req.user.id,
      products: cart.products,
      totalPrice,
      shippingAddress,
      paymentMethod,
      isPaid: false
    });

    const createdOrder = await order.save();

    cart.products = [];
    await cart.save();

    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getOrderHistory = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).populate('products.productId');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
