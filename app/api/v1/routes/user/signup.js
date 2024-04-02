const express = require("express");
const { validationResult } = require("express-validator");

const User = require("../../../models/user");
const { generateJWT } = require("../../../jwt/generate");
const recaptchaValidator = require("../../../middlewares/recaptchaValidator");
const { registerSchema } = require("../../../validators/userValidationSchemas");

const router = express.Router();

router.post("/signup", registerSchema, async (req, res) => {
   try {
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty())
         return res
            .status(400)
            .json({ message: validationErrors.array()[0].msg });

      const captchaToken = req.headers["captcha-token"];
      const { username, password } = req.body;
      try {
         const token = generateJWT({ username });
         const createUser = new User({ username, password, token });

         const isExistUsername = await User.findOne({ username });
         if (isExistUsername)
            return res.status(400).json({
               message: "This Username has already been registered",
            });

         const isRecaptchaValid = await recaptchaValidator.recaptchaValidator(
            captchaToken
         );
         if (isRecaptchaValid.success !== true)
            throw new Error("Invalid reCaptcha token");
         await createUser.save();
         return res.status(201).json(createUser);
      } catch (error) {
         return res.status(500).json({
            message: error.message
         });
      }
   } catch (error) {
      return res.status(500).json({ message: "Error creating user:" + error });
   }
});

module.exports = router;
