const Candidate = require('../model/Candidates')

const addCandidate = async (req,res)=>{
    try{
        const {...candidateDetails} = req.body;
        const newCandidate = await Candidate.create(candidateDetails);

        return res.status(200).json(newCandidate)

    }catch(e){
        console.log(e);
    }
}

const getCandidates = async (req,res)=>{
    try{
        const candidates = await Candidate.find()
        if(!candidates || candidates.length === 0){
            return res.status(400).json({msg:'No candidates found'})
        }
        return res.status(200).json({candidates})
    }catch(e){
        console.log(e);
        return res.status(400).json({e})
    }
}

module.exports = {addCandidate,getCandidates}