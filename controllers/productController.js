const Product = require('../model/Product');


module.exports.createOrder = async (req, res) => {

  try {
    return res.status(201).json('product create successfully');
  } catch (err) {
    return res.status(400).json(`${err}`);
  }

}
