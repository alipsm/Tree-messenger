var CryptoJS = require("crypto-js");


export const encryptText = (value: string) => {
    const sekret_key = process.env.NEXT_PUBLIC_CLIENT_HASH_KEY
    var ciphertext = CryptoJS.AES.encrypt(value, sekret_key).toString();
    return ciphertext
}




// const encryptObject = (value: object) => {
//     const sekret_key = process.env.NEXT_PUBLIC_CLIENT_HASH_KEY
//     var hashedObject = CryptoJS.AES.encrypt(JSON.stringify(value), sekret_key).toString();
//     return hashedObject
// }