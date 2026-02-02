import express, { Request, Response } from 'express';
import { handleAddCar, handleCarDetails, handleShowroom, renderAddCar } from '../controllers/car.controller';
import { Car } from '../models/car.model'; // <--- FIX 1: Model Import karna zaroori hai
import { upload } from '../middlewares/multer.middleware'; // <--- Import Multer

const router = express.Router();



// 2. Add Car Page Dikhana (GET)
router.get("/add-car", renderAddCar);

router.post("/add-car", upload.single("image"), handleAddCar);

// 4. Car Details
router.get("/car-details/:id", handleCarDetails);
export default router; // <--- FIX 2: Router ko export karna na bhoolein