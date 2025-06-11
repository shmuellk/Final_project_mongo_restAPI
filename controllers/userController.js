const User = require("../models/User");
const Cost = require("../models/Cost");
/**
 * @typedef {Object} UserDetailsResponse
 * @property {string} first_name - The first name of the user.
 * @property {string} last_name - The last name of the user.
 * @property {number} id - The unique identifier of the user.
 * @property {number} total - The total sum of all costs for this user.
 */
/**
 * Controller to fetch user details by ID, including total costs.
 *
 * @param {import('express').Request<{ id: string }>} req
 * @param {import('express').Response<UserDetailsResponse>} res
 * @returns {Promise<void>}
 */
exports.getUserDetails = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const user = await User.findOne({ id });
    if (!user) return res.status(404).json({ error: "User not found" });
    const totalCosts = await Cost.aggregate([
      { $match: { userid: id } },
      { $group: { _id: null, total: { $sum: "$sum" } } },
    ]);
    res.json({
      first_name: user.first_name,
      last_name: user.last_name,
      id: user.id,
      total: totalCosts[0]?.total || 0,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
