const Cost = require("../models/Cost");
/**
 * @typedef {Object} CostItem
 * @property {string} description - Description of the cost.
 * @property {string} category - Category under which the cost falls.
 * @property {string} userid - ID of the user who made the cost.
 * @property {number} sum - Amount of the cost.
 * @property {Date} createdAt - Timestamp when the cost was created.
 */
/**
 * Handler to add a new cost item.
 *
 * @param {import('express').Request<{}, {}, CostItem>} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>}
 */
exports.addCost = async (req, res) => {
  // Destructure expected fields from request body
  const { description, category, userid, sum, createdAt } = req.body;
  try {
    // Create and save a new Cost document
    const cost = new Cost({ description, category, userid, sum, createdAt });
    await cost.save();
    // Respond with 201 Created and the new cost object
    res.status(201).json(cost);
  } catch (error) {
    // On validation or other errors, respond with 400 Bad Request
    res.status(400).json({ error: error.message });
  }
};
/**
 * Handler to get a monthly report of costs for a user.
 *
 * @param {import('express').Request<{}, {}, {}, { id: string; year: string; month: string }>} req
 * - Express request object. Expects query params:
 * - id: user ID
 * - year: four-digit year
 * - month: month number (1–12)
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>}
 */

const ALL_CATEGORIES = ["food", "education", "health", "housing"];

exports.getMonthlyReport = async (req, res) => {
  const { id, year, month } = req.body;
  try {
    // Calculate date range for the given month
    const startDate = new Date(Number(year), Number(month) - 1, 1);
    const endDate = new Date(Number(year), Number(month), 0, 23, 59, 59);
    // Fetch all costs for this user within the date range
    const costs = await Cost.find({
      userid: id,
      createdAt: { $gte: startDate, $lte: endDate },
    });
    // Group costs by category and map to desired output format
    const groupedCosts = costs.reduce((acc, cost) => {
      acc[cost.category] = acc[cost.category] || [];
      acc[cost.category].push({
        sum: cost.sum,
        description: cost.description,
        day: cost.createdAt.getDate(), // day of the month
      });
      return acc;
    }, /** @type {Record<string, Array<{sum:number,description:string,day:number}>>} */ ({}));

    const costsArray = ALL_CATEGORIES.map((cat) => ({
      [cat]: groupedCosts[cat] || [],
    }));

    // Respond with the report structure
    res.json({
      userid: id,
      year: Number(year),
      month: Number(month),
      costs: costsArray,
    });
  } catch (error) {
    // On unexpected errors, respond with 500 Internal Server Error
    res.status(500).json({ error: error.message });
  }
};
