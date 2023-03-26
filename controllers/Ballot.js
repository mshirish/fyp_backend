const Ballot = require('../model/Ballot')

const  giveVote = async (req,res) =>{
    const voter = req.user.userId;
    console.log(voter);

    try{
        const 
        {...voteDetails} = req.body;
        const isInvalidVoter = await Ballot.find({votedBy : voter})
 
        console.log(isInvalidVoter.length)
        if(isInvalidVoter && isInvalidVoter.length >= 1 ){
            return res.status(401).json({msg:`The vote of user ${voter} has already been registered`})
        }
        const vote = await Ballot.create({...voteDetails,votedBy:voter});
        return res
        .status(200)
        .json({ msg: `${vote} given successfully` });
    }
    catch(e){
        console.log(e);
        return res.status(400).json({msg:"couldn't give vote"})
    }

}
const getVotes = async (req,res)=>{
    try{
        const votes = await Ballot.find()
        if ((!votes || votes.length === 0)) {
            return res.status(400).json({msg:`No votes found.`})
        }
        return res.status(200).json({votes})
    }
    catch(e){
        console.log(e);
        return res.status(400).json({msg:"didn't found votes"})

    }
}
const countMayorVote = async (req,res)=>{
    try{

        const party = req.body.party;
        const votes = await Ballot.find({mayor:party}).exec()


        const noOfVotes = votes.length;
        return res.status(200).json({msg:`The no of vote got by ${party} for Mayor position is ${noOfVotes}`})
    }
    catch(error){
        console.log(error);
        return res.status(400).json({msg:'An error occured'})
    }
}
const countDeputyMayorVote = async (req,res)=>{
    try{

        const party = req.body.party;
        const votes = await Ballot.find({deputyMayor:party})
        const noOfVotes = votes.length;
        return res.status(200).json({msg:`The no of vote got by ${party} for deputyMayor position is ${noOfVotes}`})
    }
    catch(error){
        console.log(error);
        return res.status(400).json({msg:'An error occured'})
    }
}
const countwardChairpersonVote = async (req,res)=>{
    try{

        const party = req.body.party;
        const votes = await Ballot.find({wardChairperson:party})
        const noOfVotes = votes.length;
        return res.status(200).json({msg:`The no of vote got by ${party} for wardChairperson position is ${noOfVotes}`})
    }
    catch(error){
        console.log(error);
        return res.status(400).json({msg:'An error occured'})
    }
}
const countwardMember1Vote = async (req,res)=>{
    try{

        const party = req.body.party;
        const votes = await Ballot.find({wardMember1:party})
        const noOfVotes = votes.length;
        return res.status(200).json({msg:`The no of vote got by ${party} for wardMember1 position is ${noOfVotes}`})
    }
    catch(error){
        console.log(error);
        return res.status(400).json({msg:'An error occured'})
    }
}
const countwardMember2Vote = async (req,res)=>{
    try{

        const party = req.body.party;
        const votes = await Ballot.find({wardMember2:party})
        const noOfVotes = votes.length;
        return res.status(200).json({msg:`The no of vote got by ${party} for wardMember2 position is ${noOfVotes}`})
    }
    catch(error){
        console.log(error);
        return res.status(400).json({msg:'An error occured'})
    }
}
const countwardMember3Vote = async (req,res)=>{
    try{

        const party = req.body.party;
        const votes = await Ballot.find({wardMember3:party})
        const noOfVotes = votes.length;
        return res.status(200).json({msg:`The no of vote got by ${party} for wardMember3 position is ${noOfVotes}`})
    }
    catch(error){
        console.log(error);
        return res.status(400).json({msg:'An error occured'})
    }
}
const countwardMember4Vote = async (req,res)=>{
    try{

        const party = req.body.party;
        const votes = await Ballot.find({wardMember4:party})
        const noOfVotes = votes.length;
        return res.status(200).json({msg:`The no of vote got by ${party} for wardMember4 position is ${noOfVotes}`})
    }
    catch(error){
        console.log(error);
        return res.status(400).json({msg:'An error occured'})
    }
}
module.exports = {giveVote,getVotes,countMayorVote,countDeputyMayorVote,countwardChairpersonVote,countwardMember1Vote,countwardMember2Vote,countwardMember3Vote,countwardMember4Vote}