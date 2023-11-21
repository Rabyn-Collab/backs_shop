const express = require('express');
const router = express.Router();
const product = require('../controllers/productController');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const check = require('../middlewares/authCheck');
const checkFile = require('../middlewares/fileCheck');

router.get('/', (req, res) => {
  return res.status(200).json('welcome shop api');
});

router.get('/api/products', product.getAllProducts);
router.post('/api/createOrder',
  check.checkUser, check.checkAdmin,
  checkFile.fileCheck,
  product.createOrder);
router.get('/api/product/:id', product.getProductById);



module.exports = router;