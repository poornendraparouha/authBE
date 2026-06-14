// import User from "../models/user.js";
import logger from "../utils/logger.js";

const authorize = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
                logger.warn(`ACCESS_DENIED: User ${req.user.userId} tried to access ${req.originalUrl}`);
            return res.status(403).json({
                success: false,
                message: "Access Denied"
            })
        }
        next();
    }
}

export default authorize;