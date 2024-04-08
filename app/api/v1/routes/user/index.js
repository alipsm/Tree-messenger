const express = require("express");

// schema
const { registerSchema, loginSchema } = require("../../../validators/userValidationSchemas");

// controller
const userController = require("../../../controller/user/index")

const router = express.Router();

router.post("/signup", registerSchema, userController.signUp);
router.post("/login", loginSchema, userController.login);
router.post("/get-user", loginSchema, userController["get-users"]);

router.get("/core", userController.core)

router.delete("/delete/:username", loginSchema, userController.delete);

module.exports = router;
