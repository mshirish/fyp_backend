const Admin = require("../model/Admin");
const User = require("../model/User");

const register = async (req, res) => {
  try {
    const citizenshipNumber = req.body.citizenshipNumber;
    console.log(citizenshipNumber);
    const email = req.body.email;
    const numberExists = await User.findOne({ citizenshipNumber });

    if (numberExists ) {

      res.status(406).json({
        message: "The citizenship id is already registered. Please login",
      });
      return;
    }
    const emailExists = await User.findOne({ email });
    if (emailExists ) {
      res.status(406).json({
        message: "The email is already registered. Please use different email",
      });
      return;
    }

    const user = await User.create({ ...req.body });
    const token = user.createJWT();
    res.status(200).json({
      user: { name: user.name, _id: user.id },
      token,
    });
  } catch (error) {
      return res.status(400).json({msg:"the email or citizenship if you're using is already registered in our database. Try again"})
  }
};

const login = async (req, res) => {
  const { citizenshipNumber, password } = req.body;

  if (!citizenshipNumber || !password) {
    res.send("Please provide citizenshipNumber and password");
  }
  const user = await User.findOne({ citizenshipNumber });
  if (!user) {
    res.send("Invalid Credentials");
  }
  // compare password
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    res.send("Invalid Credentials");
  }
  const token = user.createJWT();
  const id = user._id;

  const isAdmin = await Admin.find({userID: id})
  
  if(isAdmin.length === 0 || !isAdmin){
    res.status(200).json({
      userdetails: {
        id: user._id,
        name: user.name,
        email: user.email,
        citizenshipNumber: user.citizenshipNumber,
      },
      token,
      role: 'user'
    });
  }
  res.status(200).json({
    userdetails: {
      id: user._id,
      name: user.name,
      email: user.email,
      citizenshipNumber: user.citizenshipNumber,
    },
    token,
    role: 'admin'
  });
};

module.exports = { register, login };