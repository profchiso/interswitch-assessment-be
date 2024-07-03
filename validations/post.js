const { body } = require("express-validator");

exports.PostCreationValidation = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("body").trim().notEmpty().withMessage("Body is required"),
];
