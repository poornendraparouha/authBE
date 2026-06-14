import User from "../models/user.js";

const authorize = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.User.roles)){
            return res.status(403).json({
                success: false,
                message: "Access Denied"
            })
        }
        next();
    }
}

export default authorize;