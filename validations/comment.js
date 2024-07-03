const { body, param } = require("express-validator");

exports.CommentCreationValidation = [
  body("body").trim().notEmpty().withMessage("Body is required"),
  param("post").trim().notEmpty().withMessage("PostId is required"),
];
