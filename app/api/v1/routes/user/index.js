const express = require("express");
const { validationResult } = require("express-validator");

const User = require("../../../models/user");
const { generateJWT , decodeJWT } = require("../../../jwt/generate");
const recaptchaValidator = require("../../../middlewares/recaptchaValidator");
const { registerSchema ,loginSchema } = require("../../../validators/userValidationSchemas");

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
         return res.status(201).json({
          token:createUser.token,
          username:createUser.username,
          quick_id:createUser.quick_id
        });
      } catch (error) {
         return res.status(500).json({
            message: error.message
         });
      }
   } catch (error) {
      return res.status(500).json({ message: "Error creating user:" + error });
   }
});

router.post("/login", loginSchema, async (req, res) => {
   try {
     const validationErrors = validationResult(req);
     if (!validationErrors.isEmpty())
       return res.status(400).json({ message: validationErrors.array()[0].msg });
     const { username, password } = req.body;
     try {
       var getUserData = await User.findOne({ username });

       if ( !!!getUserData || getUserData?.password != password) {
         return res.status(400).json({
           message: "The password or username is wrong",
         });
       }

       return res.status(200).json({
         token:getUserData.token,
         username:getUserData.username,
         quick_id:getUserData.quick_id
       });
     } catch (error) {
       return res.status(500).json({
         message: "Internal server Error, Please try again later",
       });
     }
   } catch (error) {
     return res.status(500).json({ message: "Error Login user:" + error });
   }
});


router.post("/get-user", loginSchema, async (req, res) => {
  try {
    const { quick_id } = req.body;
    try {
      var getUserData = await User.findOne({ quick_id });

      console.log("user data is:",getUserData)
      if ( !!!getUserData ) {
        return res.status(400).json({
          message: "Quick ID not found",
        });
      }

      return res.status(200).json({
        username:getUserData.username,
        quick_id:getUserData.quick_id
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server Error, Please try again later",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error Find user:" + error });
  }
});

router.get("/core",async(req, res)=>{
  try {
    const userToken = req.headers.authorization?.split?.(' ')[1];
    if(!userToken){
      return res.redirect(401).json({ message: "Token isn't valid"});
    }

    const decodeData = decodeJWT(userToken)
    const username = decodeData?.username
    var getUserData = await User.findOne({ username });
    if(getUserData){
      return res.status(200).json({
        token:getUserData.token,
        username:getUserData.username,
        quick_id:getUserData.quick_id
      })
    }
  } catch (error) {
    console.log("catch error is:",error)
  }


  return res.status(404).json({ message: "user not found"});
})

module.exports = router;
