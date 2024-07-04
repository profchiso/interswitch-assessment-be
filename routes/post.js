const express = require("express");
const {
  getAllPosts,
  getAPost,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/post");
const { authenticate } = require("../utils");
const { PostCreationValidation } = require("../validations/post");

const postRouter = express.Router();
postRouter.use(authenticate); // authenticate all post routes
postRouter.get("/", getAllPosts);
postRouter.get("/:id", getAPost);
postRouter.post("/", PostCreationValidation, createPost);
postRouter.patch("/:id", updatePost);
postRouter.delete("/:id", deletePost);

module.exports = { postRouter };
