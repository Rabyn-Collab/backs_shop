const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const isExist = await User.findOne({ email: email });

    if (isExist) {
      const isPass = bcrypt.compareSync(password, isExist.password);
      const token = jwt.sign({
        id: isExist._id
      }, 'jsonToken');
      if (isPass) return res.status(200).json({
        email,
        token,
        fullname: isExist.fullname,
        isAdmin: isExist.isAdmin,
        shippingAddress: isExist.shippingAddress
      });
      return res.status(401).json('invalid credential');

    } else {
      return res.status(401).json('invalid credential');
    }

  } catch (err) {
    return res.status(400).json(`${err}`);
  }

}


module.exports.userRegister = async (req, res) => {
  const { email, fullname, password } = req.body;
  try {
    const isExist = await User.findOne({ email: email });

    if (isExist) {
      return res.status(403).json('user already exist');
    } else {
      const hash = await bcrypt.hash(password, 12);
      await User.create({
        email,
        fullname,
        password: hash
      });
      return res.status(201).json('successfully registered');
    }

  } catch (err) {
    return res.status(400).json(`${err}`);
  }


}





module.exports.userUpdate = async (req, res) => {
  const { email, fullname, shippingAddress } = req.body;
  try {
    const isExist = await User.findById(req.user._id);
    if (isExist) {
      isExist.email = email || isExist.email;
      isExist.fullname = fullname || isExist.fullname;
      isExist.shippingAddress = shippingAddress || isExist.shippingAddress;

      isExist.save();
      const token = jwt.sign({
        id: isExist._id
      }, 'jsonToken');
      return res.status(201).json({
        email: isExist.email,
        token,
        fullname: isExist.fullname,
        isAdmin: isExist.isAdmin,
        shippingAddress: isExist.shippingAddress
      });
    } else {

      return res.status(404).json('user doesn\'t exist');
    }

  } catch (err) {
    return res.status(400).json(`${err}`);
  }


}