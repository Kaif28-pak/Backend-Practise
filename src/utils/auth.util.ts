import jwt from "jsonwebtoken";

const SECRET_KEY = "secret12345@#"; // Isse .env mein rakhein

// User data ka structure define karein
interface UserPayload {
    id: string;
    username: string;
    email: string;
}

// Token banane ka function
export const setUser = (user: any): string => {
    const payload: UserPayload = {
        id: user._id,
        username: user.username,
        email: user.email,
    };
    return jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
};

// Token verify karne ka function
export const getUser = (token: string): UserPayload | null => {
    try {
        return jwt.verify(token, SECRET_KEY) as UserPayload;
    } catch (error) {
        return null;
    }
};