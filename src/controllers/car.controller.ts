import { Car } from '../models/car.model';
import { Request, Response } from "express";



// 1. Showroom Logic (Saari gaadiyan dikhana)
export async function handleShowroom(req: Request, res: Response) {
    try {
        const allCars = await Car.find({});
        res.render("showroom", { cars: allCars });
    } catch (error) {
        console.log(error);
        res.send("Error loading showroom");
    }
}

// 2. Add Car Page Dikhana (GET)
export function renderAddCar(req: Request, res: Response) {
    res.render("add-car");
}

// 3. Car Save Karna (POST)
export async function handleAddCar(req: Request, res: Response) {
    try {
        const { name, brand, price, description } = req.body;
        
        // Image Path set karna
        const imagePath = req.file ? `/uploads/${req.file.filename}` : "";

        await Car.create({
            name,
            brand,
            price,
            image: imagePath,
            description
        });

        res.redirect("/api/user/showroom");
    } catch (error) {
        console.log(error);
        res.send("Error adding car");
    }
}

// 4. Specific Car Details Dikhana
export async function handleCarDetails(req: Request, res: Response) {
    try {
        const carId = req.params.id;
        const car = await Car.findById(carId);

        if (car) {
            res.render("car-details", { car });
        } else {
            res.send("Car not found");
        }
    } catch (error) {
        res.send("Error: " + error);
    }
}
