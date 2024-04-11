module.exports.getCaptchaToken=(req)=>{
    let captchaToken;
    try {
        
        captchaToken = req.headers["captcha-token"];
    } catch (error) {
        return undefined
    }
    return captchaToken
}