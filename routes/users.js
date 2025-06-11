const express = require("express");
// Create a new router instance
const router = express.Router();

// Import the user controller that handles user-related logic
const userController = require("../controllers/userController");

/**
 * @module routes/user
 */

/**
 * GET /api/users/:id
 *
 * Fetches detailed user information by ID, including total cost summary.
 * Expects route parameter:
 *   - id: string (numeric user ID)
 *
 * Controller: userController.getUserDetails
 *
 * @name GetUserDetails
 * @function
 * @memberof module:routes/user
 * @param {import('express').Request<{id: string}>} req - Express request object
 * @param {import('express').Response}                res - Express response object
 * @returns {void}
 */
router.get("/users/:id", userController.getUserDetails);

// Export the configured router to be mounted in app.js
module.exports = router;
