const express = require("express");
const {
    createAdmin,
    getAdmins,
    deleteUser,
    verifyUser,
    getAllUsers,
    findUser,
    getAllUnverifiedUsers,
    getAllVerifiedUsers


} = require("../controllers/admin");
const router = express.Router();

router.route("/").post(createAdmin).get(getAdmins);
router.route("/users").get(getAllUsers);
router.route("/users/search").get(findUser);
router.route("/users/:id/deleteuser").patch(deleteUser);
router.route("/users/getAllUnverifiedUsers").get(getAllUnverifiedUsers)
router.route("/users/getAllVerifiedUsers").get(getAllVerifiedUsers)
router.route("/users/:id/verifyUser").patch(verifyUser)



module.exports = router;