const User = require("../model/User");

const Admin = require("../model/Admin");

const createAdmin = async (req, res) => {
  /* const ID = req.user.userId;
  const userFound = await Admin.findOne({ userID: ID });
  console.log(userFound);
  if (!userFound) {
    return res.status(404).json({ msg: `You are not an admin` });
  }
 */
  const adminUserId = req.body.userID;

  const userExists = await User.find({ _id: adminUserId });

  if (!userExists) {
    return res.status(400).json("The user doesn't exist");
  }

  if (userExists.role !== "caretaker") {
    return res.status(400).json("Only a caretaker can be promoted to admin");
  }
  const adminExists = await Admin.find({ userID: adminUserId });

  if (adminExists == null || adminExists.length == "0") {
    const admin = await Admin.create(req.body);
    return res
      .status(200)
      .json({ msg: `Admin created successfully. Details: ${admin}` });
  } else {
    return res.status(400).json("The user is already an admin");
  }
};

const getAdmins = async (req, res) => {
  /* const ID = req.user.userId;
  const userFound = await Admin.findOne({ userID: ID });
  console.log(userFound);
  if (!userFound) {
    return res.status(404).json({ msg: `fafwdadwaYou are not an admin` });
  }
 */
  const admins = await Admin.find({});
  return res.status(200).json({ admins });
};

const deleteUser = async (req, res) => {
  const update = { isDeleted: true };
  const identifiedUser = req.params.id;
  const userExists = await User.findOneAndUpdate(
    { _id: identifiedUser },
    update,
    { new: true, runValidators: true }
  );
  if (!userExists) {
    return res.status(404).json({ msg: "The user doesn't exist." });
  }
  return res
    .status(200)
    .json({ msg: `user ${identifiedUser} deleted successfully` });
};

const getAllUsers = async (req, res) => {
  const users = await User.find();
  if (!users) {
    return res.status(404).json({ msg: "Error no users found" });
  }
  return res.status(200).json({ users });
};

const getAllUnverifiedUsers = async(req,res)=>{
    const users = await User.find({isVerified:false});
  if (!users || users.length === 0) {
    return res.status(404).json({ msg: "Error no unverified users found" });
  }
  return res.status(200).json({ users });
}

const getAllVerifiedUsers = async(req,res)=>{
    const users = await User.find({isVerified:true});
  if (!users || users.length === 0) {
    return res.status(404).json({ msg: "Error no verified users found" });
  }
  return res.status(200).json({ users });
}

const findUser = async (req, res) => {
  const id = req.body.userId;
  const user = await User.findOne({ _id: id });
  if (!user) {
    return res.status(404).json({ msg: "Error: User not found of given id" });
  }
  return res.status(200).json({ user });
};





const verifyUser = async (req, res) => {
  const userId = req.params.id;
  const userProfile = await User.findOne({ _id: userId });

  if (!userProfile) {
    return res.status(400).json({ msg: "The user doesn't exist" });
  }
  if (userProfile.isVerified == true) {
    return res.status(400).json({ msg: "The profile is already verified" });
  }
  const update = { isVerified: true };
  const updatedProfile = await User.findOneAndUpdate(
    { _id: userId },
    update,
    {
      new: true,
      runValidators: true,
    }
  );
  return res.status(200).json({ updatedProfile });
};


module.exports = {
  createAdmin,
  getAdmins,
  deleteUser,
  verifyUser,
  getAllUsers,
  findUser,
  getAllUnverifiedUsers,
  getAllVerifiedUsers
};
