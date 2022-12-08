const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/AuthController");

const authenticate = require("../middleware/authenticate");

router.post("/adduser", AuthController.register);
router.get("/getusers", AuthController.index);
router.post("/deletestudent", AuthController.deleteuser);
router.post("/getsingle", AuthController.show);

router.post("/login", AuthController.login);
router.post("/adminreg", AuthController.adminregister);
router.post("/adminlogin", AuthController.adminlogin);
router.put("/adminupdate", AuthController.updateAdmin);
router.put("/updateuser", AuthController.updateuser);
router.post("/refresh-token", AuthController.refreshToken);

module.exports = router;
