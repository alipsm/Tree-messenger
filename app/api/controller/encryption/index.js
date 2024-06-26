const { validationResult } = require("express-validator");
const { ErrorHandler } = require("../../errors/ErrorHandler");
const { getCaptchaToken } = require("../../utils/getCaptchaToken");
const { recaptchaValidator } = require("../../middlewares/recaptchaValidator");
const { decryptClientCipherText, encryptData } = require("../../utils/encryption");

module.exports.encrypt = async (req, res) => {
   try {
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty())
         throw ({ message: validationErrors.array()[0].msg, statusCode: 400 })

    const { message } = req.body;
    
    const captchaToken = getCaptchaToken(req)
      const isRecaptchaValid = await recaptchaValidator(
         captchaToken
      );
      if (isRecaptchaValid.success !== true)
         throw ({ message: "Invalid reCaptcha token", statusCode: 401 });

      const getOriginalMessage = await decryptClientCipherText(message)
      const encryptedMessage = await encryptData(getOriginalMessage)

      return res.status(201).json({
         message: encryptedMessage,
         status:true
      });
   } catch (error) {
      ErrorHandler(error, req, res)
   }
}