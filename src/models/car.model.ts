import { Schema, model, Document } from 'mongoose';

export interface ICar extends Document {
    name: string;
    brand: string;
    price: number;
    image: string; // Image URL ya path
    description: string;
}

const carSchema = new Schema<ICar>({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true }
});

export const Car = model<ICar>('Car', carSchema);