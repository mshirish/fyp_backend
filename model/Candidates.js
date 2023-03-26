const mongoose = require("mongoose");

const CandidcateSchema = new mongoose.Schema({
    partyName:{
        type:String,
        required:true
    },
    partyLogo:{
        type:String
    }
},
{timestamps:true}
);

module.exports = mongoose.model("Candidate", CandidcateSchema);
