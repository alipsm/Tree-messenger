const express = require("express");

// schema
const { encryptSchema } = require("../../../validators/encryptionValidation");

// controller
const encryptionController = require("../../../controller/encryption/index");

const router = express.Router();

// POST methods
router.post("/encrypt", encryptSchema, encryptionController.encrypt );

module.exports = router;
