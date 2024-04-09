module.exports.getAuthToken=(req)=>{
    let userToken;
    try {
        
         userToken = req.headers.authorization?.split?.(' ')[1];
    } catch (error) {
        return undefined
    }
    return userToken
}