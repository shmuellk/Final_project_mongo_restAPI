// Import Supertest for HTTP assertions and the Express app instance
const request = require("supertest");
const app = require("../app");
// Import Mongoose so we can close the DB connection after tests
const mongoose = require("mongoose");
/**
 * @module tests/cost
 * @description
 * Test suite for cost-related endpoints, including adding new cost items
 * and fetching monthly reports.
 */
describe("Costs Endpoint Tests", () => {
  /**
   * Test that posting a valid cost item returns 201 Created and the new document
   * @async
   * @function
   * @memberof module:tests/cost
   */
  test("POST /api/add - should add a new cost item", async () => {
    const newCost = {
      userid: 123123,
      description: "bread",
      category: "food",
      sum: 20,
    };
    const res = await request(app)
      .post("/api/add") // send POST to /api/add
      .send(newCost) // include our cost payload
      .expect(201); // expect HTTP 201 Created
    // Verify the response body has the properties we expect
    expect(res.body).toHaveProperty("_id");
    expect(res.body.description).toBe("bread");
    expect(res.body.category).toBe("food");
    expect(res.body.sum).toBe(20);
    expect(res.body.userid).toBe(123123);
  });
  /**
   * Test that fetching the monthly report returns the correct structure
   * @async
   * @function
   * @memberof module:tests/cost
   */
  test("GET /api/report - should return monthly report", async () => {
    const userid = 123123;
    const year = 2025;
    const month = 5;
    const res = await request(app)
      .get(`/api/report?id=${userid}&year=${year}&month=${month}`) // send GET with query params
      .expect(200); // expect HTTP 200 OK
    // Validate the response contains our query parameters and a 'costs' object
    expect(res.body.userid).toBe(String(userid));
    expect(res.body.year).toBe(year);
    expect(res.body.month).toBe(month);
    expect(res.body).toHaveProperty("costs");
    expect(typeof res.body.costs).toBe("object");
  });
  /**
   * Test that posting a cost with an invalid category returns 400 Bad Request
   * @async
   * @function
   * @memberof module:tests/cost
   */
  test("POST /api/add - invalid category should fail", async () => {
    const invalidCost = {
      userid: 123123,
      description: "invalid item",
      category: "invalid-category", // not one of ['food','health','housing','sport','education']
      sum: 10,
    };
    const res = await request(app)
      .post("/api/add") // send POST to /api/add
      .send(invalidCost) // with invalid category
      .expect(400); // expect HTTP 400 Bad Request
    // Expect an error message in the response
    expect(res.body).toHaveProperty("error");
  });
  /**
   * Close the Mongoose connection after all tests to prevent open handles
   * @async
   * @function
   * @memberof module:tests/cost
   */
  afterAll(async () => {
    await mongoose.connection.close();
  });
});
