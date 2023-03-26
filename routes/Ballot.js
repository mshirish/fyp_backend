const express = require("express");
const router = express.Router();

const {giveVote,getVotes,countMayorVote,countDeputyMayorVote,countwardChairpersonVote,countwardMember1Vote,countwardMember2Vote,countwardMember3Vote,countwardMember4Vote}= require('../controllers/Ballot')

router.route('/').post(giveVote).get(getVotes)
router.route('/countMayorvote').get(countMayorVote)
router.route('/countDeputyMayorVote').get(countDeputyMayorVote)
router.route('/countwardChairpersonVote').get(countwardChairpersonVote)
router.route('/countwardMember1Vote').get(countwardMember1Vote)
router.route('/countwardMember2Vote').get(countwardMember2Vote)
router.route('/countwardMember3Vote').get(countwardMember3Vote)
router.route('/countwardMember4Vote').get(countwardMember4Vote)

module.exports = router;
