import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/users.model';
import { setUser } from "../utils/auth.util";
// import { IUser } from '../types/user.type'

export async function handleUserRegister(req: Request, res: Response): Promise<void> {
    const { username, email, password } = req.body;
    console.log(req.body);
    
    try {
        // Validation logic
        if (!username || !email || !password) {
            res.render("register", { error: "Saari fields bharna zaroori hai!" });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        
        const hashedPassword = await bcrypt.hash(password, salt);
        

        const user = await User.create({ username, email, password: hashedPassword });
        // 1. Token Generate karein
        const token = setUser(user);

        // 2. Cookie mein set karein
        res.cookie("token", token, {
            httpOnly: true, // Frontend JS ise read nahi kar payegi (Secure)
            // secure: process.env.NODE_ENV === "production", // Sirf HTTPS par kaam karega
            maxAge: 24 * 60 * 60 * 1000, // 1 Din ki expiry
            path: "/",
        });
        res.redirect("/api/user/dashboard");
    } catch (error: any) {
        res.render("register", { error: "Registration Failed: " + error.message });
    }
}

export async function handleUserLogin(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.render("login", { error: "User nahi mila!" });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.render("login", { error: "Ghalat password!" });
            return;
        }
        // 1. Token Generate karein
        const token = setUser(user);

        // 2. Cookie mein set karein
        res.cookie("token", token, {
            httpOnly: true, // Frontend JS ise read nahi kar payegi (Secure)
            // secure: process.env.NODE_ENV === "production", // Sirf HTTPS par kaam karega
            maxAge: 24 * 60 * 60 * 1000, // 1 Din ki expiry
            path: "/",
        });
       
    
        res.redirect("/api/user/dashboard");
    } catch (error: any) {
        res.render("login", { error: "Login Error" });
    }
}

export const handleUserLogout = (req: Request, res: Response) => {
    res.clearCookie("token", { path: "/" }); // Cookie delete kar di
    return res.redirect("/api/user/login"); // Wapas login par bhej diya
};