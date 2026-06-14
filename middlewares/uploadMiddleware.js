import multer from "multer";
import path from "path";
import logger from "../utils/logger.js";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName )
    },
    
})

const fileFilter = (req, file, cb) => {
    const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];
  if(allowedTypes.includes(file.mimetype)){
    cb(null, true)
  } else {
     logger.warn( `INVALID_FILE_TYPE: ${file.mimetype}`);
    cb(new Error("Only image files allowed"), false);
  }
}

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024,
    }

});

export default upload;