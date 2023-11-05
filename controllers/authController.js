const User = require('../model/User');


module.exports.userLogin = (req, res) => {
  console.log(req.body);
  return res.status(200).json("welcome to shop backs");
}


module.exports.userRegister = async (req, res) => {
  const { email, fullname, password } = req.body;
  try {
    const isExist = await User.findOne({ email: email });

    if (isExist) {
      return res.status(403).json({ message: 'user already exist' });
    } else {
      await User.create({
        email,
        fullname,
        password
      });
      return res.status(201).json({ message: 'successfully registered' });
    }

  } catch (err) {
    return res.status(400).json({ message: `${err}` });
  }


}