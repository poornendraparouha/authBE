import user from "../models/user";

const authorize = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.roles)){
            return res.status(403).json({
                success: false,
                message: "Access Denied"
            })
        }
        next();
    }
}

export default authorize;