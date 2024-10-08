import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import {v2 as cloudinary} from 'cloudinary'
import { app,server } from "./socket/socket.js";
import path from 'path'

dotenv.config();
connectDB()

//const app = express();


const PORT  = process.env.PORT || 5000;
const __dirname = path.resolve();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({extended: true})) //To parse from data in the req.body
app.use(cookieParser());

app.use('/api/users',userRoutes)
app.use('/api/message', messageRoutes)

app.use(express.static(path.resolve(__dirname, "frontend", "dist")));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`))