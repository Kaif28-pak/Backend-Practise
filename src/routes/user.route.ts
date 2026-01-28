import express from 'express';
import { Request, Response } from "express";
import { restrictToLoggedinUserOnly } from "../middlewares/auth.middleware";
import { handleUserRegister, handleUserLogin } from '../controllers/user.controller';
const router = express.Router();
router.get("/user/login", (req: Request, res: Response) => {

    return res.render("login");
})
router.get("/user/register", (req: Request, res: Response) => {

    return res.render("register");
})
router.get("/user/dashboard", restrictToLoggedinUserOnly, (req: any, res: any, next: any) => {
    // EJS ko data render karein jo token se mila
    res.render("dashboard", {
        username: req.user?.username || "User",
        email: req.user?.email || "No Email"
    });
});
router.post('/user/register', handleUserRegister);
router.post('/user/login', handleUserLogin);

export default router; // Default export for the router