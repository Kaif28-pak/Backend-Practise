import express from 'express';
import { Request, Response } from "express";
import { restrictToLoggedinUserOnly } from "../middlewares/auth.middleware";
import { handleUserRegister, handleUserLogin } from '../controllers/user.controller';
import { Car } from '../models/car.model';
import { handleUserLogout } from '../controllers/user.controller';
const router = express.Router();
router.get("/user/login", (req: Request, res: Response) => {

    return res.render("login");
})
router.get("/user/register", (req: Request, res: Response) => {

    return res.render("register");
})
router.get("/user/dashboard", restrictToLoggedinUserOnly, async (req: any, res: any) => {
    try {
        // Database se saari cars fetch karein
        const cars = await Car.find({});

        // Ab render karte waqt 'cars' pass karein
        res.render("dashboard", {
            username: req.user?.username || "User",
            email: req.user?.email,
             cars: cars // <--- YE MISSING THA, ISLIYE ERROR AA RAHA THA
        });
    } catch (error) {
        console.log("Dashboard Error:", error);
        // Error aane par empty array bhej dein taaki page crash na ho
        res.render("dashboard", {
            username: req.user?.username,
            cars: [] 
        });
    }
});
router.post('/user/register', handleUserRegister);
router.post('/user/login', handleUserLogin);

// Logout route
router.get("/user/logout", handleUserLogout);
export default router; // Default export for the router