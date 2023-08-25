import express, { application } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import swaggerjsdoc from "swagger-jsdoc"
import swaggerui from "swagger-ui-express"
import path from 'path'

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongodb");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected!!");
});

//middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API documentation for Booking Application MERNSTACK using SWAGGER",
      version: "0.1.0",
      descritpion: "This is simple Booking API documentation made with Express and documented with swagger",
      contact: {
        name: "Yesh Adithya",
        url: "http://yeshadithya.hypergeek.lk/",
        email: "yesh.adithya31@gmail.com"
      }
    },
    servers: [
      {
        url: "http://localhost:8800"
      },
    ],
  },
  apis: ["./routes/*.js"],
}

const spacs = swaggerjsdoc(options)
app.use(
  "/api-docs",
  swaggerui.serve,
  swaggerui.setup(spacs)
)

app.get("/", (req, res)=>{
  res.send("This is Nodejs API")
})

app.use("/api/auth", authRoute);
app.use("/api/user", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Somthing went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8800, () => {
  connect();
  console.log("Connected to backend!!");
});
