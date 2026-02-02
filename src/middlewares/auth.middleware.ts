import { Request, Response, NextFunction } from "express";
import { getUser } from "../utils/auth.util";

// Express Request type ko extend karein taaki .user use kar sakein
interface AuthRequest extends Request {
    user?: any;
}

export const restrictToLoggedinUserOnly = (
    req: AuthRequest, 
    res: Response, 
    next: NextFunction
): void => {
    const token = req.cookies?.token;
    // console.log("Cookie Token:", token);
    if (!token) {
        return res.redirect("/api/user/login");
    }

    const user = getUser(token);
    if (!user) {
        return res.redirect("/api/user/login");
    }

    req.user = user; // User details ko request mein attach karein
    next();
};