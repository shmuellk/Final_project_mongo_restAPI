const mongoose = require("mongoose");
/**
 * @typedef {Object} CostDocument
 * @property {string} description - Description of the cost item.
 * @property {"food"|"health"|"housing"|"sport"|"education"} category
 * @property {number} userid - Numeric ID of the user who created the cost.
 * @property {number} sum - Monetary amount of the cost.
 * @property {Date} createdAt - Timestamp when the cost was created.
 */
/**
 * Mongoose schema for the Cost collection.
 * @type {mongoose.Schema<CostDocument>}
 */
const costSchema = new mongoose.Schema({
  description: { type: String, required: true },
  category: {
    type: String,
    enum: ["food", "health", "housing", "sport", "education"],
    required: true,
  },
  userid: { type: Number, required: true },
  sum: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});
/**
 * @type {mongoose.Model<CostDocument>}
 */
module.exports = mongoose.model("Cost", costSchema);
