const mongoose = require("mongoose");
const User = require("./User");

const BallotSchema = new mongoose.Schema(
  {
    electionId:{
      type: mongoose.Types.ObjectId,
      ref: 'Election',
      required:true
    },
    mayor:{
      type:String,
      required:true
    },
    deputyMayor:{
      type:String,
      required:true
    },
    wardChairperson:{
      type:String,
      required:true
    },
    wardMember1:{
      type:String,
      required:true
    },
    wardMember2:{
      type:String,
      required:true
    },
    wardMember3:{
      type:String,
      required:true
    }, 
    wardMember4:{
      type:String,
      required:true
    },
    votedBy:{
      type: mongoose.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Ballot", BallotSchema);