import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
        
        console.log(`\n MongoDB Connected! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB connection FAILED: ", error);
        process.exit(1); // Agar connect nahi hua toh app band kar do
    }
}

export default connectDB;