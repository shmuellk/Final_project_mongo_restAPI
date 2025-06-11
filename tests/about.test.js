// Import Supertest for making HTTP requests and the Express app
const request = require("supertest");
const app = require("../app");
// Import Mongoose to close the DB connection after tests
const mongoose = require("mongoose");

/**
 * @module tests/about
 * @description
 * Test suite for the /api/about endpoint, verifying that it returns the expected
 * list of team members with only first_name and last_name properties.
 */

describe("About Endpoint Tests", () => {
  /**
   * Test that GET /api/about returns an array of team members
   * @async
   * @function
   * @memberof module:tests/about
   */
  test("GET /api/about - should return team members", async () => {
    const res = await request(app)
      .get("/api/about") // send GET request to /api/about
      .expect(200); // expect HTTP 200 OK

    // The response body should be an array
    expect(Array.isArray(res.body)).toBe(true);

    // Each member object should only contain first_name and last_name
    res.body.forEach((member) => {
      expect(member).toHaveProperty("first_name");
      expect(member).toHaveProperty("last_name");
      // Ensure there are no extra properties
      expect(Object.keys(member)).toHaveLength(2);
    });
  });

  /**
   * Close Mongoose connection after all tests to prevent open handles
   * @async
   * @function
   * @memberof module:tests/about
   */
  afterAll(async () => {
    await mongoose.connection.close();
  });
});
