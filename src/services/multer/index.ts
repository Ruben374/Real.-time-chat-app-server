import { Request } from "express";
type DestinationCallback = (error: Error | null, destination: string) => void;
//type FileNameCallback = (error: Error | null, filename: string) => void;
const multer = require("multer");
const storage = multer.memoryStorage({
  filename: function (req: Request, file: any, callback: DestinationCallback) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    callback(null, uniqueSuffix + "-" + file.originalname);
  },
});

const fileFilter = (request: Request, file: any, callback: any) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    callback(null, true);
  } else {
    callback(null, false);
  }
};
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});
