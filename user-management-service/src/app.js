const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const { errorResponse } = require("./utils/responseHandler");
const logger = require("./utils/logger");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Middleware for logging requests
app.use((req, res, next) => {
  logger.info(`Request: ${req.method} ${req.url}`);
  next();
});

// User routes
app.use("/api/users", userRoutes);

// Global error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.message);
  errorResponse(res, "Internal Server Error", 500);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

module.exports = app; // Export the app for testing
