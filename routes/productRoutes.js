const express = require('express');
const router = express.Router();
const product = require('../controllers/productController');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const check = require('../middlewares/authCheck');
const checkFile = require('../middlewares/fileCheck');


const methodNotAllow = (req, res) => res.status(405).json('method not allowed');


router.get('/', (req, res) => {
  return res.status(200).json('welcome shop api');
});

router.get('/api/products', product.getAllProducts);

router.post('/api/createProduct',
  check.checkUser, check.checkAdmin,
  checkFile.fileCheck,
  product.createProduct);

router.route('/api/productUpdate/:id').patch(
  check.checkUser, check.checkAdmin,
  checkFile.updateCheck,
  product.updateProduct).all(methodNotAllow);

router.route('/api/product/:id').get(product.getProductById)
  .patch(check.checkUser, product.addReview)
  .delete(check.checkUser, check.checkAdmin,
    product.removeProduct).all(methodNotAllow);


module.exports = router;