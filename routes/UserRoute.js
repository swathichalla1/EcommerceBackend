const UserController = require("../controllers/UserController");

const express = require("express");

const router = express.Router();

router.post("/UserRegister",UserController.UserRegister);
router.post("/UserLogin",UserController.UserLogin);

module.exports = router;

