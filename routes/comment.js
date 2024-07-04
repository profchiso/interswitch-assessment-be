const express = require("express");
const {
  getAllComments,
  getAComment,
  createComment,
  updateComment,
  deleteComment,
} = require("../controllers/comment");
const { authenticate, rateLimiter, getCache } = require("../utils");
const { CommentCreationValidation } = require("../validations/comment");

const rateLimiter50_2 = rateLimiter(50, 2);
const commentRouter = express.Router();

//middleware
commentRouter.use(authenticate); // authenticate comment routes
commentRouter.use(rateLimiter50_2); // 50 requests every 2 minutes for comments routes

commentRouter.get("/", getCache, getAllComments);
commentRouter.get("/:id", getCache, getAComment);
commentRouter.post("/", CommentCreationValidation, createComment);
commentRouter.patch("/:id", updateComment);
commentRouter.delete("/:id", deleteComment);

module.exports = { commentRouter };
