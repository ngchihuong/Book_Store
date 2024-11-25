import express, { NextFunction } from "express"
import cors from "cors";
import "dotenv/config";
import connecttion from "./config/connnection";
import userRoute from "./routes/users";
import authorRoute from "./routes/authors";
import cateRoute from "./routes/categories"
import bookRoute from "./routes/books";
import orderRoute from "./routes/orders";

import { Request, Response } from "express";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEYY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/api/users", userRoute);
app.use("/api/authors", authorRoute);
app.use("/api/categories", cateRoute);
app.use("/api/books", bookRoute);
app.use("/api/orders", orderRoute);

// const port = process.env.PORT as string || 8686;
(async () => {
    try {
        //using mongoose
        await connecttion();

        app.listen(5005, () => {
            console.log("Server listening on localhost:5005")
        })
    } catch (error) {
        console.log("Error connect to Database", error);
    }
})()
