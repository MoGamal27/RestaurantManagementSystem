const appError = require("../utils/appError");

module.exports = (...roles) => {    
    return (req, res, next) => {
        if(!roles.includes(req.currentUser.role)) {
            return next(new appError("You don't have permission to perform this action", 403));
        }
        next();
    }
}