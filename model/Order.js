const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User'
  },
  orderItems: [
    {
      name: { type: String, required: true },
      qty: { type: Number, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true },
      product: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Product'
      }
    }
  ],
  totalPrice: {
    type: Number,
    required: true,
  },


}, { timestamps: true });


const Order = mongoose.model('Order', orderSchema);
module.exports = Order;

