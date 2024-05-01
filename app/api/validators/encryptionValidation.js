const { body } = require("express-validator");

const encryptSchema = [
  body("message")
    .notEmpty()
    .withMessage("ٔMessage is Empty!")
];

const decryptSchema = [
  body("qr_data")
    .notEmpty()
    .withMessage("Qr code is Empty!")
];

module.exports = {
    encryptSchema,
    decryptSchema
};