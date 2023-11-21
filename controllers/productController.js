const Product = require('../model/Product');
const mongoose = require('mongoose');


module.exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (err) {
    console.log(err);
    return res.status(400).json(`${err}`);
  }

}


module.exports.getProductById = async (req, res) => {
  // console.log(req.body);
  // console.log(req.query);
  const { id } = req.params;
  try {
    if (mongoose.isValidObjectId(id)) {
      const product = await Product.findById(id);
      return res.status(200).json(product);
    } else {
      return res.status(400).json('please provide valid id');
    }
  } catch (err) {

    return res.status(400).json(`${err}`);
  }

}




module.exports.createOrder = async (req, res) => {
  const {
    product_name,
    product_detail,
    product_price,
    brand,
    category,
    countInStock, } = req.body;

  try {
    await Product.create({
      product_name,
      product_detail,
      product_price,
      product_image: req.image,
      brand,
      category,
      countInStock,
    });


    return res.status(201).json('product create successfully');
  } catch (err) {

    return res.status(400).json(`${err}`);
  }

}
