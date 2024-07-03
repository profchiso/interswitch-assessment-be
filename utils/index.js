const { connectToDb } = require("./dbcon");
const {
  getAll,
  getOne,
  createDocument,
  updateDocument,
  deleteDocument,
} = require("./crudOperations");
const { STATUS_CODES, RESPONSE_TEXT } = require("./response");
const { authenticate } = require("./auth");
const { hashUserPassword, decryptPassword } = require("./passwordManipulation");
const { generateAccessToken } = require("./token");
const { validationCheck } = require("./validationCheck");

module.exports = {
  connectToDb,
  getAll,
  getOne,
  createDocument,
  updateDocument,
  deleteDocument,
  STATUS_CODES,
  RESPONSE_TEXT,
  authenticate,
  hashUserPassword,
  decryptPassword,
  generateAccessToken,
  validationCheck,
};
