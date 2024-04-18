var CryptoJS = require("crypto-js");
module.exports.decryptClientCipherText = async (value) => {
    try {
        const sekret_key = process.env.NEXT_PUBLIC_CLIENT_HASH_KEY
        var bytes = await CryptoJS.AES.decrypt(value, sekret_key);
        var originalText = await bytes.toString(CryptoJS.enc.Utf8);
        return originalText
    } catch (error) {
        return undefined
    }
}