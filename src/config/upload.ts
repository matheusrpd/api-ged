import { Request } from 'express';
const multer = require('multer');
const path = require("path");

const config = {
    storage: new multer.diskStorage({
        destination: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
        filename: (req: Request, file: any, cb: any) =>  cb(null, file.originalname)
    })
};

export default config;