import express from 'express';
import { Request, Response } from "express";
const router = express.Router();
import { handleUserRegister, handleUserLogin } from '../controllers/user.controller';
router.get("/user/login", (req: Request, res: Response) => {
    // Iska matlab hai 'views/login.ejs' ko render karo
    return res.render("login");
})
router.get("/user/register", (req: Request, res: Response) => {
    // Iska matlab hai 'views/login.ejs' ko render karo
    return res.render("register");
})
router.get("/user/dashboard", (req: Request, res: Response) => {
    // Iska matlab hai 'views/login.ejs' ko render karo
    return res.render("dashboard");
})
router.post('/user/register', handleUserRegister);
router.post('/user/login', handleUserLogin);

export default router; // Default export for the router