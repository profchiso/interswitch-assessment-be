const express = require("express");
const {
  getAllPosts,
  getAPost,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/post");
const { authenticate, rateLimiter, getCache } = require("../utils");
const { PostCreationValidation } = require("../validations/post");

const rateLimiter50_2 = rateLimiter(50, 2);
const postRouter = express.Router();

//middleware
postRouter.use(authenticate); // authenticate all post routes
postRouter.use(rateLimiter50_2); // 50 requests  every 2 minutes for all post routes

postRouter.get("/", getCache, getAllPosts);
postRouter.get("/:id", getCache, getAPost);
postRouter.post("/", PostCreationValidation, createPost);
postRouter.patch("/:id", updatePost);
postRouter.delete("/:id", deletePost);

module.exports = { postRouter };
