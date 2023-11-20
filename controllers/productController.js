const Product = require('../model/Product');



module.exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (err) {
    console.log(err);
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
