const { body } = require("express-validator");

const encryptSchema = [
  body("message")
    .notEmpty()
    .withMessage("ٔMessage is Empty!")
];

module.exports = {
    encryptSchema,
};