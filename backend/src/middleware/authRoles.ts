import { Request, Response, NextFunction } from "express"

const authRoles = (roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.role;
    if (!roles.includes(userRole)) {
        res.status(403).json({ message: "Access denied" })
    }
    next();
}
export default authRoles;