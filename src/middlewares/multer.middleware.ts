import multer from "multer";
import path from "path";

// Storage ki setting (Kahan aur kis naam se save ho)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // File 'public/uploads' folder mein jayegi
        cb(null, "./public/uploads"); 
    },
    filename: function (req, file, cb) {
        // File ka naam unique ho taaki purani file replace na ho
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueName + path.extname(file.originalname));
    }
});

export const upload = multer({ storage: storage });