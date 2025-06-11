const express = require("express");
// Create a new router instance for the "about" endpoint
const router = express.Router();

// Import the controller that returns team information
const aboutController = require("../controllers/aboutController");

/**
 * @module routes/about
 */

/**
 * GET /api/about
 *
 * Returns the list of team members with their first and last names.
 *
 * @name GetAboutInfo
 * @function
 * @memberof module:routes/about
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @returns {void}
 */
router.get("/about", aboutController.getTeamInfo);

// Export the router to be mounted in app.js
module.exports = router;
