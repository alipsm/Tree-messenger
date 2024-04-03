const { body, header } = require("express-validator");

const registerSchema = [
  body("username")
    .notEmpty()
    .withMessage("ٔنام خالی است!")
    .isLength({ min: 5, max: 40 })
    .withMessage("نام میبایست بیشتر از 5 حرف باشد"),
  body("password")
    .notEmpty()
    .withMessage("فیلد پسورد خالی است")
    .isLength({ min: 6, max: 500 })
    .withMessage("پسورد باید حداقل شامل 6 حرف باشد"),
];

const loginSchema = [
    body("password")
      .notEmpty()
      .withMessage("Password is Empty!")
      .isLength({ min: 6, max: 500 })
      .withMessage("Illegal Password length (6 characters)"),
    body("username")
      .notEmpty()
      .withMessage("Username is Empity!")
      .isLength({ min: 5, max: 40 })
      .withMessage("Illegal Username length (5 characters)"),
  ];

module.exports = {
  registerSchema,
  loginSchema,
};
// const loginSchema = [
//   body("password")
//     .notEmpty()
//     .withMessage("فیلد پسورد خالی است")
//     .isLength({ min: 6, max: 500 })
//     .withMessage("پسورد باید حداقل شامل ۶ حرف باشد"),
//   body("username")
//     .notEmpty()
//     .withMessage("فیلد ایمیل خالی است")
//     .isEmail()
//     .withMessage("فرمت ایمیل نادرست است")
// ];

// const registerSchema = [
//     body("username")
//       .notEmpty()
//       .withMessage("ٔName is Empty value!")
//       .isLength({ min: 6, max: 40 })
//       .withMessage("Name length is out of range"),
//     body("password")
//       .notEmpty()
//       .withMessage("Password is Empty value!")
//       .isLength({ min: 6, max: 500 })
//       .withMessage("Illegal password length (6 characters)"),
//     body("email")
//       .notEmpty()
//       .withMessage("Email is Empty value!")
//       .isEmail()
//       .withMessage("Incorrect format for email"),
//       body("token")
//       .notEmpty()
//       .withMessage("Token is Empty value!")
//   ];