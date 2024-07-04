const express = require("express");
const {
  getUsers,
  getAUser,
  createUser,
  login,
  updateAUser,
} = require("../controllers/user");
const { authenticate, rateLimiter, rateLimiter } = require("../utils");
const {
  UserCreationValidation,
  UserLoginValidation,
} = require("../validations/user");

const rateLimiter20_1 = rateLimiter(20, 1);
const rateLimiter5_1 = rateLimiter(5, 1); //for login 5 attempts in  1 minute

const userRouter = express.Router();

userRouter.get("/", authenticate, rateLimiter20_1, getUsers);
userRouter.get("/:id", authenticate, rateLimiter20_1, getAUser);
userRouter.post("/", UserCreationValidation, createUser);
userRouter.post("/login", UserLoginValidation, rateLimiter5_1, login);
userRouter.patch("/:id", authenticate, rateLimiter20_1, updateAUser);

module.exports = { userRouter };
