const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');


router.get('/', auth.userLogin
  // (req, res) => auth.userLogin(req, res)
);
router.post('/api/userLogin', auth.userLogin);
router.post('/api/userRegister', auth.userRegister);


module.exports = router;