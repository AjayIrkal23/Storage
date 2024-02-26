import { Request, Response, NextFunction } from "express";
import axios from "axios";
import path from "path";
import fs from "fs";

const uploadFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
    const uploadFolder = "dumpData";
    const uploadedFile = req.file;
    // Access file content as buffer: uploadedFile.buffer

    // Ensure the upload folder exists
    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder);
    }

    // Save the file in the upload folder
    const savePath = path.join(uploadFolder, uploadedFile.originalname);
    fs.writeFileSync(savePath, uploadedFile.buffer);

    console.log("File Saved:", uploadedFile.originalname);

    res.status(200).send("File Saved");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default { uploadFile };
