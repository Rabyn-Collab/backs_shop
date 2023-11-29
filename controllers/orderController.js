const Order = require('../model/Order');
const mongoose = require('mongoose');

module.exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', '-password');
    return res.status(200).json(orders);
  } catch (err) {
    console.log(err);
    return res.status(400).json(`${err}`);
  }

}


module.exports.getOrderByUser = async (req, res) => {


  try {

    const orders = await Order.find({ user: req.user._id });
    return res.status(200).json(orders);

  } catch (err) {

    return res.status(400).json(`${err}`);
  }

}



module.exports.getOrderById = async (req, res) => {
  // console.log(req.body);
  // console.log(req.query);
  const { id } = req.params;
  try {
    if (mongoose.isValidObjectId(id)) {
      const order = await Order.findById(id).populate('user', '-password');
      return res.status(200).json(order);
    } else {
      return res.status(400).json('please provide valid id');
    }
  } catch (err) {

    return res.status(400).json(`${err}`);
  }

}




module.exports.createOrder = async (req, res) => {
  const {

    orderItems,
    totalPrice,
  } = req.body;

  try {
    await Order.create({
      user: req.user._id,
      orderItems,
      totalPrice,
    });


    return res.status(201).json('order create successfully');
  } catch (err) {

    return res.status(400).json(`${err}`);
  }

}


