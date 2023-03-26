const User = require("../model/User")

const isVerified = async(req,res) =>{
    const userId = req.user.userId;
    console.log(userId);
    const userExists = await User.findOne({_id: userId })
    const verificationStatus = userExists.isVerified;
    console.log(verificationStatus);
    if(verificationStatus == 'false'){
        return req.status(404).json({msg:"The user is not veirifed yet. Please contact admin"})
    }
    next();
}
module.exports = isVerified;