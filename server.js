// Import the Express application
const app = require("./app");
// Use PORT from environment or default to 5000
const port = process.env.PORT || 5000;
/**
 * @module server
 * @description Starts the HTTP server and logs the listening port.
 */
app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
