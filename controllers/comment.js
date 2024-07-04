const {
  getOne,
  getAll,
  updateDocument,
  deleteDocument,
  createDocument,
  STATUS_CODES,
  RESPONSE_TEXT,
  validationCheck,
} = require("../utils");

const { Comment } = require("../models/comment");

exports.getAllComments = async (req, res) => {
  try {
    getAll(req, res, Comment);
  } catch (error) {
    console.log(error);
  }
};
exports.getAComment = async (req, res) => {
  try {
    getOne(req, res, Comment);
  } catch (error) {
    console.log(error);
  }
};

exports.createComment = async (req, res) => {
  try {
    await validationCheck(req, res);
    req.body.user = req.user.id;
    const created = await createDocument(
      req,
      res,
      Comment,
      {},
      "Comment created successfully"
    );
    res.status(STATUS_CODES.CREATED).json({
      statusCode: STATUS_CODES.CREATED,
      responseText: RESPONSE_TEXT.SUCCESS,
      data: created,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.updateComment = async (req, res) => {
  try {
    const isUserComment = await Comment.findOne({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!isUserComment) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        statusCode: STATUS_CODES.BAD_REQUEST,
        responseText: RESPONSE_TEXT.FAIL,
        errors: [{ msg: "You can only update a Comment that belongs to you" }],
      });
    }
    updateDocument(req, res, Comment, "Comment updated successfully");
  } catch (error) {
    console.log(error);
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const isUserComment = await Comment.findOne({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!isUserComment) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        statusCode: STATUS_CODES.BAD_REQUEST,
        responseText: RESPONSE_TEXT.FAIL,
        errors: [{ msg: "You can only update a Comment that belongs to you" }],
      });
    }
    deleteDocument(req, res, Comment, "Comment deleted successfully");
  } catch (error) {
    console.log(error);
  }
};
