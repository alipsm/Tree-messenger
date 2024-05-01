const express = require("express");

// schema
const { encryptSchema , decryptSchema } = require("../../../validators/encryptionValidation");

// controller
const encryptionController = require("../../../controller/encryption/index");

const router = express.Router();

// POST methods
router.post("/encrypt", encryptSchema, encryptionController.encrypt );
router.post("/decrypt", decryptSchema, encryptionController.decrypt );

module.exports = router;
