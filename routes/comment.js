const express = require("express");
const {
  getComments,
  getAComment,
  createComment,
  updateComment,
  deleteComment,
} = require("../controllers/comment");
const { authenticate } = require("../utils");
const { CommentCreationValidation } = require("../validations/comment");

const commentRouter = express.Router();
commentRouter.use(authenticate); // authenticate comment routes
commentRouter.get("/", getComments);
commentRouter.get("/:id", getAComment);
commentRouter.post("/", CommentCreationValidation, createComment);
commentRouter.patch("/:id", updateComment);
commentRouter.delete("/:id", deleteComment);

module.exports = { commentRouter };
