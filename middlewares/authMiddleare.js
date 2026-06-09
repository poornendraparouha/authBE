import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer ")){
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
        console.error("Invalid token");
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        })
        
    }
}