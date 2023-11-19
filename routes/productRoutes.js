const express = require('express');
const router = express.Router();
const product = require('../controllers/productController');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const check = require('../middlewares/authCheck');
const checkFile = require('../middlewares/fileCheck');

router.get('/api/products', product.getAllProducts);
router.post('/api/createOrder',
  check.checkUser, check.checkAdmin,
  checkFile.fileCheck,
  product.createOrder);


module.exports = router;