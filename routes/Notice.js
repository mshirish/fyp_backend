const express = require("express");
const router = express.Router();

const {postNotice, getNotices} = require("../controllers/Notice");
const isAdmin = require("../middleware/isAdmin");

router.route("/").get(getNotices)
router.route("/",isAdmin).post(postNotice)

module.exports = router;
