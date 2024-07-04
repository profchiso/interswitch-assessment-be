require("dotenv").config();
const request = require("supertest");
const express = require("express");
const { postRouter } = require("../routes/post");
const { connectToDb } = require("../utils");

const userId = "6686b3458f902e3018f8f275";
let postId;
const app = express();
app.use(express.json());
app.use("/api/v1/posts", postRouter);

describe("Post Endpoints", () => {
  beforeAll(async () => {
    await connectToDb();
  });

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4NmIzNDU4ZjkwMmUzMDE4ZjhmMjc1In0sImlhdCI6MTcyMDEwODkyNiwiZXhwIjoxNzIwMTk1MzI2fQ.SwMw_myYmgeG_HWQb_yeKTsSxLs39P7TSLg0HKL02x0";
  it("should create a new post", async () => {
    const res = await request(app)
      .post("/api/v1/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test post",
        body: "test post body",
        user: userId,
      });

    postId = res.body.data.resource._id;
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("data");
  });

  it("should fetch all posts", async () => {
    const res = await request(app)
      .get("/api/v1/posts")
      .set("Authorization", `Bearer ${token}`);
    console.log();
    expect(res.statusCode).toEqual(200);

    expect(res.body).toHaveProperty("resource");
  });

  it("should fetch a single post", async () => {
    const res = await request(app)
      .get(`/api/v1/posts/${postId}`)
      .set("Authorization", `Bearer ${token}`); // include your auth token if needed
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
  });

  it("should update a post", async () => {
    const res = await request(app)
      .patch(`/api/v1/posts/${postId}`)
      .send({
        title: "Updated post",
      })
      .set("authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
  });

  it("should delete a post", async () => {
    const res = await request(app)
      .delete(`/api/v1/posts/${postId}`)
      .send({})
      .set("authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
  });
});
