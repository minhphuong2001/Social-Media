require("dotenv").config();
const ErrorResponse = require("../helper/ErrorResponse");
const jwt = require("jsonwebtoken");

const verifyAccessToken = (req, res, next) => {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];

    // empty token
    if (!token) {
        return next(new ErrorResponse(401, 'Access token not found'));
    }

    // check valid token
    try {
        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.userId = decode.userId;
        req.role = decode.role;

        next();
    } catch (error) {
        next(new ErrorResponse(401, error.message));
    }
}

module.exports = {verifyAccessToken};