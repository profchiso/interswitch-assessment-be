const express = require("express");
const {
  getPosts,
  getAPost,
  createPost,
  updateAPost,
  deleteAPost,
} = require("../controllers/post");
const { authenticate } = require("../utils");
const { PostCreationValidation } = require("../validations/post");

const postRouter = express.Router();
postRouter.use(authenticate); // authenticate all post routes
postRouter.get("/", getPosts);
postRouter.get("/:id", getAPost);
postRouter.post("/", PostCreationValidation, createPost);
postRouter.patch("/:id", updateAPost);
postRouter.delete("/:id", deleteAPost);

module.exports = { postRouter };
