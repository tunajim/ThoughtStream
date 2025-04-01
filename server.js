import express from "express";
import connectDB from "./config/db.js"; // Import database connection
import dotenv from "dotenv";
import diaryRoutes from "./routes/diaryRoutes.js";
import cors from "cors";

// Load environment variables
dotenv.config();

// Initialize Express App
const app = express();

// Connect to MongoDB
connectDB();

// Use Express Middleware to parse JSON requests
app.use(express.json());
app.use(cors({ origin: "*" }));

// Define API Routes
// route requests to /api/diary and forward to diaryRoutes
app.use("/api/diary", diaryRoutes); 

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to ThoughtStream API");
});

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
