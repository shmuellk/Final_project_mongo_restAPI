// Import Supertest for HTTP assertions and the Express app
const request = require("supertest");
const app = require("../app");
// Import Mongoose to close the DB connection after tests
const mongoose = require("mongoose");
/**
 * @module tests/user
 * @description
 * Test suite for the users endpoint, verifying user detail retrieval and error handling.
 */
describe("Users Endpoint Tests", () => {
  /**
   * Test that fetching an existing user returns correct details
   * @async
   * @function
   * @memberof module:tests/user
   */
  test("GET /api/users/:id - should return user details", async () => {
    const userId = 123123;
    const res = await request(app)
      .get(`/api/users/${userId}`) // make GET request to /api/users/123123
      .expect(200); // expect HTTP 200 OK
    // Validate response body contains the required fields with correct types
    expect(res.body).toEqual(
      expect.objectContaining({
        first_name: expect.any(String),
        last_name: expect.any(String),
        id: userId,
        total: expect.any(Number),
      })
    );
  });
  /**
   * Test that fetching a non-existent user returns a 404 error
   * @async
   * @function
   * @memberof module:tests/user
   */
  test("GET /api/users/:id - should fail if user not found", async () => {
    const nonExistentId = 999999;
    const res = await request(app)
      .get(`/api/users/${nonExistentId}`) // make GET request to /api/users/999999
      .expect(404); // expect HTTP 404 Not Found
    // Validate response body contains an 'error' property
    expect(res.body).toHaveProperty("error");
  });
  /**
   * Close the Mongoose connection after all tests to prevent open handles
   * @async
   * @function
   * @memberof module:tests/user
   */
  afterAll(async () => {
    await mongoose.connection.close();
  });
});
