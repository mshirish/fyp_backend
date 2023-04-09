const express = require("express");
const router = express.Router();

const {createElection} = require('../controllers/Elections')

router.route('/').post(createElection)

module.exports = router;
