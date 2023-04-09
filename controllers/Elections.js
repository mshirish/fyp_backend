const Election = require('../model/Election')

const createElection = async (req,res)=>{
    try{
        const electionDetails = {
            electionName: req.body.electionName,
            candidates: req.body.candidates,
            startDate:req.body.startDate,
            endDate:req.body.endDate
        }
        const newElection = await Election.create(electionDetails);
        return res.status(200).json(newElection)
    }catch(error){
        console.log(error);
    }
}

module.exports = {createElection}