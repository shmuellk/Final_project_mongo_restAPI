const express = require("express");
// Create a new router instance for cost-related routes
const router = express.Router();

// Import the cost controller which contains the business logic
const costController = require("../controllers/costController");

/**
 * @module routes/cost
 */

/**
 * POST /api/add
 *
 * Adds a new cost item for a user.
 * Expects a JSON body with the following fields:
 *   - description: string
 *   - category: string (one of "food","health","housing","sport","education")
 *   - userid: number
 *   - sum: number
 *   - createdAt?: Date
 *
 * @name AddCost
 * @function
 * @memberof module:routes/cost
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @returns {void}
 */
router.post("/add", costController.addCost);

/**
 * GET /api/report
 *
 * Retrieves a monthly cost report for a user.
 * Expects query parameters:
 *   - id: string (user ID)
 *   - year: string (four-digit year)
 *   - month: string (1-12)
 *
 * @name GetMonthlyReport
 * @function
 * @memberof module:routes/cost
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @returns {void}
 */
router.get("/report", costController.getMonthlyReport);

// Export the router to be used in app.js
module.exports = router;
