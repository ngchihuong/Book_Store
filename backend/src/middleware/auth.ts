import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            userId: string;
            role: string;
        }
    }
}
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies["auth_token"];
    if (!token) {
        res.status(401).json({ message: "Unauthorized!" });
    } else {
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
            req.userId = (decode as JwtPayload).userId;
            req.role = (decode as JwtPayload).role;
            next();
        } catch (error) {
            console.log(error);
            res.status(401).json({ message: "Unathorized!" });
        }
    }
}
export default verifyToken;