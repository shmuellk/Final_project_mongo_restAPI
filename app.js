// Import dependencies
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./utils/db");
/**
 * @module app
 * @description
 * Initializes and configures the Express application, sets up middleware,
 * connects to the database, and mounts route handlers under the /api prefix.
 */
const app = express();
app.use(cors());
app.use(bodyParser.json());
connectDB();
/**
 * Mount API routes
 */
app.get("/", (req, res) => {
  res.send("welcom to the API");
});

const aboutRouter = require("./routes/about");
const costsRouter = require("./routes/costs");
const userRouter = require("./routes/users");
app.use("/api", aboutRouter);
app.use("/api", costsRouter);
app.use("/api", userRouter);
/**
 * Express application instance
 * @type {import('express').Application}
 */
module.exports = app;
