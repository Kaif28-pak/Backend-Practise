import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/users.model';
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
        console.log(salt);
        
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log(hashedPassword);
        

        await User.create({ username, email, password: hashedPassword });
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

       
    
        res.redirect("/dashboard");
    } catch (error: any) {
        res.render("login", { error: "Login Error" });
    }
}