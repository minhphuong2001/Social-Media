const ErrorResponse = require("../helper/ErrorResponse")

const permission = (role) => {
    return (req, res, next) => {
        if (req.role !== role) {
            return next(new ErrorResponse(400, 'No authorized'));
        }
        next();
    }
}

module.exports = permission;