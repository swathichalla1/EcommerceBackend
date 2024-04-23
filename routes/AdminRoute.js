const AdminController = require("../controllers/AdminController");

const express = require("express");

const router = express.Router();

router.post("/AdminRegister",AdminController.AdminRegister);
router.post("/AdminLogin",AdminController.AdminLogin);
router.get("/all-admins",AdminController.getAllAdmins);
router.get("/single-admin/:adminId",AdminController.getAdminById);
router.get("/adminProducts/:adminid",AdminController.getProductsOfAdmin);

module.exports = router;

