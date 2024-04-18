const bcrypt = require('bcrypt');


const generateHash = async (value) => {
    if (!!!value) throw new Error("Error in generate hash:(value is empity!)")

    try {
        const saltRounds = 8;
        return new Promise((resolve, reject) => {
            bcrypt.hash(value, saltRounds, function (err, hash) {
                if (err) reject(err)
                resolve(hash)
            });
        }).then(hash => {
            return hash

        }).catch(err => { throw new Error(err) })
    } catch (error) {
        console.log('error', error)
        throw new Error()
    }
}

const checkHash = async (value,hash) => {
    if (!!!hash || !!!value) throw new Error("Error in check hash:(value/hash is empity!)")

    try {
        return new Promise((resolve, reject) => {
            bcrypt.compare(value, hash, function(err, result) {
                if (err) reject(err)
                resolve(result)
            });
        }).then(result => {
            return result

        }).catch(err => { throw new Error(err) })
    } catch (error) {
        console.log('error', error)
        throw new Error()
    }
}

module.exports={
    generateHash,
    checkHash
}