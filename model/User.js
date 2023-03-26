const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//a basic schema of the Database of the employees.



const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Provide Name"],
      maxlength: 50,
      minlength: 3,
    },
    dateOfBirth:{
        type: String,
        required:true
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: 6,
    },
    mobileNumber:{
        type: Number,
        required:true
    },
    gender:{
        type:String,
        enum:['male','female','others']  
    },
    citizenshipNumber:{
        type:String,
        required:true
    },
    issuedAuthority:{
        type:String,
        required:true,
    },
    issuedDate:{
        type:String,
        required:true,
    },
    issuedDistrict:{
        type:String,
        required:true,
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    isVerified:{
        type:Boolean,
        default:false
    }
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name, email: this.email, role: this.role },
    process.env.JWT_SECRET
  );
};

UserSchema.pre("find", function () {
  this.select(["-isDeleted", "-v"]).where({ isDeleted: { $ne: true } });
});
UserSchema.pre("findOne", function () {
  this.select(["-isDeleted", "-v"]).where({ isDeleted: { $ne: true } });
});
/* UserSchema.pre("find", function () {
    this.select(["-isVerified", "-v"]).where({ isVerified: { $ne: false } });
  });
  UserSchema.pre("findOne", function () {
    this.select(["-isVerified", "-v"]).where({ isVerified: { $ne: false } });
  }); */
UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);