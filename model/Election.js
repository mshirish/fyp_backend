const mongoose = require("mongoose");

const ElectionSchema = new mongoose.Schema({
    electionName:{
        type:String,
        required:true
    },
    candidates:[{
        partyName: {
            type: String,
            required: true
        },
        partyLogo:{
            type:String
        }
    }],
    startDate:{
        type:Date,
        required: true
    },
    endDate:{
        type:Date,
        required: true
    },
},
{timestamps:true}
);

module.exports = mongoose.model("Election", ElectionSchema);
