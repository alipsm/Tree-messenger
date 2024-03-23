const axios = require("axios");
const SENSITIVITY = .7
async function recaptchaValidator(token) {
  const URL = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.NEXT_PUBLIC_CAPTCHA_SERVER_KEY}&response=${token}`;
  try {
    if (!token) {
      console.error("ReCaptcha Error: Empity token!")
      throw new Error();
    }
    const response = await axios.get(URL);
    if (isSuccessCaptchaRes(response)) {
      return {
        success: true,
        score: response.data.score
      }
    }
    throw new Error()
  } catch (error) {
    return false;
  }
}

module.exports = {
  recaptchaValidator,
};


// pure functions
const isSuccessCaptchaRes = res => res && res.data?.success && res.data?.score > SENSITIVITY