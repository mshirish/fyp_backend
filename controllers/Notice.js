const Notice = require("../model/Notices")

const postNotice = async (req,res)=>{
    try{
    const notice = req.body.message;
    const postedNotice = await Admin.create(notice);
    return res.status(200).json({postedNotice})
}
    catch{
        return res.status(400).json({msg:"Couldn't post"})
    }
}

const getNotices = async (req,res)=>{
    const notices = await Notice.find();
    if(!notices || notices.length === 0){
        return res.status(400).json({msg:"No notices found"})
    }
    return res.status(200).json(notices)
}
module.exports = {postNotice, getNotices};