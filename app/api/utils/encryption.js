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


module.exports.encryptData = async (data) => {
    try {
        if(typeof data === "object"){
            data = JSON.stringify(data)
        }

        const sekret_key = process.env.SERVER_ENCRYPTION_KEY
        var encryptedData = await CryptoJS.AES.encrypt(data, sekret_key).toString();

        return encryptedData
    } catch (error) {
        return undefined
    }
}

module.exports.decryptData = async (data) => {
    try {
        const sekret_key = process.env.SERVER_ENCRYPTION_KEY
        var bytes = await CryptoJS.AES.decrypt(data, sekret_key);
        var decryptedData = await bytes.toString(CryptoJS.enc.Utf8);
        const originalData = new Promise(()=>{decryptedData = JSON.parse(decryptedData)}).finally(()=>{return decryptedData})
        return originalData
    } catch (error) {
        return undefined
    }
}
