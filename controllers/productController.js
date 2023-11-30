const Product = require('../model/Product');
const mongoose = require('mongoose');
const fs = require('fs');

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




module.exports.createProduct = async (req, res) => {
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




module.exports.updateProduct = async (req, res) => {
  const { id } = req.params;

  const {
    product_name,
    product_detail,
    product_price,
    brand,
    category,
    countInStock,
  } = req.body;

  try {

    if (mongoose.isValidObjectId(id)) {
      const isExist = await Product.findById(id);
      if (isExist) {
        isExist.product_name = product_name || isExist.product_name;
        isExist.product_detail = product_detail || isExist.product_detail;
        isExist.product_price = product_price || isExist.product_price;
        isExist.brand = brand || isExist.brand;
        isExist.category = category || isExist.category;
        isExist.countInStock = countInStock || isExist.countInStock;
        isExist.product_image = req.image || isExist.product_image;
        isExist.save();
        return res.status(201).json('product updated successfully');
      } else {
        return res.status(401).json('product not found');
      }

    } else {
      return res.status(400).json('please provide valid id');
    }


  } catch (err) {

    return res.status(400).json(`${err}`);
  }

}



module.exports.removeProduct = async (req, res) => {
  const { id } = req.params;
  try {

    if (mongoose.isValidObjectId(id)) {
      const isExist = await Product.findById(id);

      if (isExist) {

        fs.unlink(`.${isExist.product_image}`, (err) => {

        });
        await isExist.deleteOne();
        return res.status(201).json('product removed successfully');
      } else {
        return res.status(401).json('product not found');
      }

    } else {
      return res.status(400).json('please provide valid id');
    }


  } catch (err) {

    return res.status(400).json(`${err}`);
  }

}





module.exports.addReview = async (req, res) => {
  const { id } = req.params;
  const { comment, username, rating } = req.body;
  try {
    const isExist = await Product.findById(id);

    if (isExist) {
      const isReviewed = isExist.reviews.find((rev) => rev.user.toString() === req.user._id.toString());

      // if (isReviewed) {
      //   return res.status(400).json('you have already added a review');
      // } else {
      isExist.reviews.push({
        comment,
        username,
        rating: Number(rating),
        user: req.user._id
      });
      const total = isExist.reviews.reduce((p, n) => p + n.rating, 0)
      isExist.numReviews = isExist.reviews.length;
      isExist.rating = total / isExist.reviews.length;
      await isExist.save();
      return res.status(201).json('review added successfully');
      // }


    } else {
      return res.status(400).json('product not found');
    }

  } catch (err) {

    return res.status(400).json(`${err}`);
  }

}
