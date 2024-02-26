import express, { NextFunction, Request, Response } from "express";

import multer from "multer";
import unzipper from "unzipper";

import axios from "axios";
import path from "path";
import fs from "fs";
import DumpData from "../controllers/DumpData";

const storage = multer.memoryStorage();

const upload = multer({ storage });

const router = express.Router();

router.post("/upload", upload.single("file"), DumpData.uploadFile);

export = router;
