const { createUser, getAllUsers, deleteUser } = require("../controllers/userController");
const verifyRole = require('../middleware/verifyRole');
const userRoles = require('../utils/userRoles');
const verifyToken = require('../middleware/verifyToken');
const { userValidator } = require('../utils/validators/userValidator');
const express = require("express");
const router = express.Router();


router.post("/", userValidator , verifyToken, verifyRole(userRoles.ADMIN) , createUser);

router.get("/", verifyToken, verifyRole(userRoles.ADMIN) , getAllUsers);

router.delete("/:id", verifyToken, verifyRole(userRoles.ADMIN), deleteUser);

module.exports = router