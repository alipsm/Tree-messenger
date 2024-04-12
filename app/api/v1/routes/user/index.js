const express = require("express");

// schema
const { registerSchema, loginSchema } = require("../../../validators/userValidationSchemas");

// controller
const userController = require("../../../controller/user/index");

const router = express.Router();

// POST methods
router.post("/signup", registerSchema, userController.signUp);
router.post("/login", loginSchema, userController.login);
router.post("/get-user", loginSchema, userController["get-users"]);

// PUT methods
router.put("/update", loginSchema, userController.update);

// GET methods
router.get("/core", userController.core)

// DELETE methods
router.delete("/delete", loginSchema, userController.delete);

module.exports = router;
