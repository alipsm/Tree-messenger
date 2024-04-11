module.exports.ErrorHandler = (err, req, res) => {
    console.log("Middleware Error Hadnling");
    const errStatus = err.statusCode || 500;
    const errMsg = err.message || 'Internal Server Error! \n Please try again';
    return res.status(errStatus).json({
        success: false,
        message: errMsg,
        stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    })
}