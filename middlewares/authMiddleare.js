import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";

export const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            logger.warn("MISSING_AUTH_HEADER");
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }

        const token = authHeader.split(" ")[1];
        const decode = jwt.verify(
            token,
            process.env.JWT_SECRET
        )
        req.user = decode;

        next();
        
    } catch (error) {
        logger.warn(`INVALID_TOKEN: ${error.message}`);
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        })
    }
}