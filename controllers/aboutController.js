/**
 * @typedef {Object} TeamMember
 * @property {string} first_name - The first name of the team member.
 * @property {string} last_name - The last name of the team member.
 */
/**
 * Array of team members.
 * @type {TeamMember[]}
 */
const teamMembers = [
  { first_name: "Shmuel", last_name: "Lahchakov" },
  { first_name: "Itzhak", last_name: "Yesayev" },
];
/**
 * Controller function to return the team members list.
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {void}
 */
exports.getTeamInfo = (req, res) => {
  res.json(teamMembers);
};
