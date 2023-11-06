const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const isExist = await User.findOne({ email: email });

    if (isExist) {

      const isPass = bcrypt.compareSync(password, isExist.password);

      if (isPass) return res.status(200).json({ message: 'successfully login' });
      return res.status(401).json({ message: 'invalid credential' });

    } else {
      return res.status(401).json({ message: 'invalid credential' });
    }

  } catch (err) {
    return res.status(400).json({ message: `${err}` });
  }

}


module.exports.userRegister = async (req, res) => {
  const { email, fullname, password } = req.body;
  try {
    const isExist = await User.findOne({ email: email });

    if (isExist) {
      return res.status(403).json({ message: 'user already exist' });
    } else {
      const hash = await bcrypt.hash(password, 12);
      await User.create({
        email,
        fullname,
        password: hash
      });
      return res.status(201).json({ message: 'successfully registered' });
    }

  } catch (err) {
    return res.status(400).json({ message: `${err}` });
  }


}