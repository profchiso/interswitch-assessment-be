require("dotenv").config();
const request = require("supertest");
const express = require("express");
const { userRouter } = require("../routes/user");
const { connectToDb } = require("../utils");

const userId = "6686b3458f902e3018f8f275";
const app = express();
app.use(express.json());
app.use("/api/v1/users", userRouter);

describe("User Endpoints", () => {
  beforeAll(async () => {
    await connectToDb();
  });

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4NmIzNDU4ZjkwMmUzMDE4ZjhmMjc1In0sImlhdCI6MTcyMDEwODkyNiwiZXhwIjoxNzIwMTk1MzI2fQ.SwMw_myYmgeG_HWQb_yeKTsSxLs39P7TSLg0HKL02x0";
  it("should create a new user", async () => {
    const res = await request(app).post("/api/v1/users").send({
      name: "Test User",
      email: "testuser990@example.com",
      password: "testpassword",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("data");
  });

  it("should fetch all users", async () => {
    const res = await request(app)
      .get("/api/v1/users")
      .set("Authorization", `Bearer ${token}`); // include your auth token if needed
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("resource");
  });

  it("should fetch a single user", async () => {
    const res = await request(app)
      .get(`/api/v1/users/${userId}`)
      .set("Authorization", `Bearer ${token}`); // include your auth token if needed
    expect(res.statusCode).toEqual(200);
  });

  it("should update a user", async () => {
    const res = await request(app)
      .patch(`/api/v1/users/${userId}`)
      .send({
        name: "Updated User",
      })
      .set("authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
  });

  it("should not create a user with existing email", async () => {
    const res = await request(app).post("/api/v1/users").send({
      name: "Test User",
      email: "existinguser@example.com",
      password: "testpassword",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("errors");
  });
});
