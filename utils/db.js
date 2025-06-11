const mongoose = require("mongoose");
require("dotenv").config();
/**
 * Connects to MongoDB using Mongoose.
 *
 * Reads the connection URI from process.env.MONGO_URI and uses recommended
 * Mongoose options for parsing and topology. Logs a message on success
 * (unless in test environment) or exits the process on failure.
 *
 * @async
 * @function connectDB
 * @returns {Promise<void>} Resolves when the database connection is established.
 * @throws Will exit the process if connection fails.
 */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "Server",
    });
    if (process.env.NODE_ENV !== "test") {
      console.log("Connected to MongoDB Atlas");
    }
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};
module.exports = connectDB;
