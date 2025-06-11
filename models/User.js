const mongoose = require("mongoose");
/**
 * @typedef {Object} UserDocument
 * @property {number} id - Unique numeric identifier for the user.
 * @property {string} first_name - User's first name.
 * @property {string} last_name - User's last name.
 * @property {Date} [birthday] - Optional date of birth.
 * @property {string} [marital_status] - Optional marital status.
 */
/**
 * Mongoose schema for the User collection.
 * @type {mongoose.Schema<UserDocument>}
 */
const userSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  birthday: { type: Date },
  marital_status: { type: String },
});
/**
 * @type {mongoose.Model<UserDocument>}
 */
module.exports = mongoose.model("User", userSchema);
