import dotenv from 'dotenv'
import express from "express"
import connectDB from "./db/connectDB";
import userRoutes from "./routes/user.route";
import path from 'path';
const app = express();
dotenv.config({ path: '.env' });


// ... baqi middlewares ke baad
app.set("view engine","ejs");
app.set("views", path.resolve(__dirname, "..", "views"));
app.use(express.urlencoded({extended:true}))
app.use("/api", userRoutes);

connectDB()

.then(()=>{
    app.listen(process.env.PORT || 4000, ()=>{
        console.log(`Server listen aur chal rha hai port ${process.env.PORT}`);
    });
})