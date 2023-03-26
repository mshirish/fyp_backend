const express = require("express");
const router = express.Router();

const isAdmin = require("../middleware/isAdmin");

const {addCandidate,getCandidates} = require('../controllers/Candidate')

router.route("/",isAdmin).post(addCandidate)
router.route("/").get(getCandidates)

module.exports = router;
