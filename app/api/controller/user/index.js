const User = require("../../models/user");
const { validationResult } = require("express-validator");
const { getAuthToken } = require("../../utils/getAuthToken");
const { ErrorHandler } = require("../../errors/ErrorHandler");
const { generateJWT, decodeJWT } = require("../../jwt/generate");
const { getCaptchaToken } = require("../../utils/getCaptchaToken");
const { generateHash, checkHash } = require("../../utils/generateHash");
const { recaptchaValidator } = require("../../middlewares/recaptchaValidator");
const { decryptClientCipherText } = require("../../utils/encryption");
const { generateQuickId } = require("../../utils/generateQuickId");

module.exports.signUp = async (req, res) => {
   try {
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty())
         throw ({ message: validationErrors.array()[0].msg, statusCode: 400 })

      const captchaToken = getCaptchaToken(req)
      const { username, password } = req.body;

      const isExistUsername = await User.findOne({ username }).catch(() => { throw Error() })
      if (isExistUsername)
         throw ({ message: "This Username has already been exist", statusCode: 400 })

      const isRecaptchaValid = await recaptchaValidator(
         captchaToken
      );
      if (isRecaptchaValid.success !== true)
         throw ({ message: "Invalid reCaptcha token", statusCode: 401 });

      const token = generateJWT({ username });

      const getOriginalPassword = await decryptClientCipherText(password)
      const hashedPassword = await generateHash(getOriginalPassword)

      const createUser = new User({ username, password: hashedPassword, token });

      await createUser.save();

      return res.status(201).json({
         token: createUser.token,
         username: createUser.username,
         quick_id: createUser.quick_id
      });
   } catch (error) {
      ErrorHandler(error, req, res)
   }
}

module.exports.login = async (req, res) => {
   try {
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty())
         throw ({ message: validationErrors.array()[0].msg, statusCode: 400 });
      const { username, password } = req.body;

      var getUserData = await User.findOne({ username }).catch(()=>{throw new Error()});

         if (!getUserData) {
            throw ({
               message: "The password or username is wrong", statusCode: 400
            });
         }

         const getOriginalPassword = await decryptClientCipherText(password)
         const isSamePassWithDb = await checkHash(getOriginalPassword, getUserData.password)

         if (!isSamePassWithDb)
            throw ({
               message: "The password or username is wrong", statusCode: 400
            });

         return res.status(200).json({
            token: getUserData.token,
            username: getUserData.username,
            quick_id: getUserData.quick_id
         });
   } catch (error) {
      ErrorHandler(error, req, res)
   }
}

module.exports["get-users"] = async (req, res) => {
   try {
      const { quick_id } = req.body;
      try {
         var getUserData = await User.findOne({ quick_id });

         console.log("user data is:", getUserData)
         if (!!!getUserData) {
            return res.status(400).json({
               message: "Quick ID not found",
            });
         }

         return res.status(200).json({
            username: getUserData.username,
            quick_id: getUserData.quick_id
         });
      } catch (error) {
         return res.status(500).json({
            message: "Internal server Error, Please try again later",
         });
      }
   } catch (error) {
      return res.status(500).json({ message: "Error Find user:" + error });
   }
}

module.exports.core = async (req, res) => {
   try {
      const userToken = req.headers.authorization?.split?.(' ')[1];
      if (!userToken) {
         return res.redirect(401).json({ message: "Token isn't valid" });
      }

      const decodeData = decodeJWT(userToken)
      const username = decodeData?.username
      var getUserData = await User.findOne({ username });
      if (getUserData) {
         return res.status(200).json({
            token: getUserData.token,
            username: getUserData.username,
            quick_id: getUserData.quick_id
         })
      }
   } catch (error) {
      console.log("catch error is:", error)
   }


   return res.status(404).json({ message: "user not found" });
}


module.exports.delete = async (req, res) => {

   try {
      console.log("delete api start")

      const authToken = getAuthToken(req)
      if (!!!authToken) {
         throw ({ message: "Token isn't valid!", statusCode: 401 });
      }

      const captchaToken = getCaptchaToken(req);
      const isRecaptchaValid = await recaptchaValidator(
         captchaToken
      );

      if (isRecaptchaValid.success !== true)
         throw new Error("Invalid reCaptcha token");

      const getUser = await User.findOne({ token: authToken }).catch(() => { throw new Error() });

      if (!getUser)
         throw ({
            message: "Sorry I can't found you! plase relogin", statusCode: 400
         });

        const password = req.headers["auth-data"];
        if (!password) {
         throw new Error("Password is empity!")
      }

      const decryptedClientPass = await decryptClientCipherText(password)
      const isSamePassWithDb = await checkHash(decryptedClientPass, getUser.password).catch(() => { throw new Error() })
      if (!isSamePassWithDb)
         throw new Error("Your password is wrong!")

      await User.findOneAndDelete({ token: authToken })
      return res.status(200).json({ message: "User deleted", success: true });

   } catch (error) {
      ErrorHandler(error, req, res)
   }
}

module.exports.update = async (req, res) => {
   try {
      const authToken = getAuthToken(req)
      if (!!!authToken) {
         throw ({ message: "Token isn't valid", statusCode: 401 });
      }

      const captchaToken = req.headers["captcha-token"];
      const isRecaptchaValid = await recaptchaValidator(
         captchaToken
      );
      if (isRecaptchaValid.success !== true)
         throw new Error("Invalid reCaptcha token");

      const { username, password, old_password , quick_id } = req.body;

      const isExistUsername = await User.findOne({ username }).catch(() => { throw Error() })
      if (isExistUsername)
         throw ({ message: "This Username has already been exist", statusCode: 400 })

      // try {
      const getUser = await User.findOne({ token: authToken });
      if (!getUser)
         throw ({
            message: "Sorry I can't found you! plase relogin", statusCode: 400
         });

      username && (getUser.username = username)
      quick_id && (getUser.quick_id = generateQuickId())
      if (old_password) {
         const getOriginalPassword = await decryptClientCipherText(old_password)
         const isSamePassWithDb = await checkHash(getOriginalPassword, getUser.password).catch(() => { throw new Error() })
         if (isSamePassWithDb) {

            const decryptedClientNewPass = await decryptClientCipherText(password)
            getUser.password = await generateHash(decryptedClientNewPass)
         }
         else
            throw new Error("Your old password is wrong!")
      }

      const token = generateJWT({ username:getUser.username });
      getUser.token = token

      await getUser.save()
      return res.status(200).json({
         token: token,
         username: getUser.username,
         quick_id:getUser.quick_id,
         success: true
      });
   } catch (error) {
      ErrorHandler(error, req, res)
   }
}