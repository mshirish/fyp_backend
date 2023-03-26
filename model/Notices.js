const mongoose = require("mongoose");

const NoticeSchema = new mongoose.Schema(
  {
    message:{
        type:String,
        required:true
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Notice", NoticeSchema);