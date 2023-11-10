const Product = require('../model/Product');


module.exports.createOrder = async (req, res) => {
  console.log(req.files);
  console.log(req.body);
  try {
    return res.status(201).json('product create successfully');
  } catch (err) {
    return res.status(400).json(`${err}`);
  }

}
