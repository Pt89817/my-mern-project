// Import Express framework to create server and APIs
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
// Import CORS to allow frontend to access backend APIs
import cors from "cors";

// Import Mongoose to connect Node.js with MongoDB
import mongoose from "mongoose";

// Import dotenv to read environment variables from .env file
import dotenv from "dotenv";

// Import authentication routes (login / register)
import authRoutes from "./routes/authRoutes.js";

// Import todo routes (add, get, delete todos)
import todoRoutes from "./routes/todoRoutes.js";

// Load environment variables from .env file into process.env
dotenv.config();

// Create an Express application
const app = express();

/* 
  Enable CORS (Cross-Origin Resource Sharing)
  This allows frontend (React app) to call backend APIs
*/

app.use(cors({
  origin: "http://localhost:5173", // frontend URL (Vite dev server)
  credentials: true,               // allow cookies / auth headers
  methods: ["GET", "POST", "PUT", "DELETE"] // allowed HTTP methods
}));

// Middleware to parse incoming JSON data from requests
app.use(express.json());

/*
  Route handling:
  Any request starting with /auth will go to authRoutes
  Example:
    POST /auth/register
    POST /auth/login
*/
app.use("/auth", authRoutes);
app.use("/todo", todoRoutes);

// Connect to MongoDB using Mongoose  MONGO_URI comes from .env file 
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Start the server on given PORT from .env file
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

