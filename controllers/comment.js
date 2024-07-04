const { isValidObjectId } = require("mongoose");
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
const { Post } = require("../models/post");

const populate = {
  required: true,
  field: "user",
  columns: "name -_id",
};

exports.getAllComments = async (req, res) => {
  try {
    const data = await getAll(
      req,
      res,
      Comment,
      ["__v"],
      populate,
      "Comments Fetched successfully"
    );

    res.status(STATUS_CODES.OK).json({
      statusCode: STATUS_CODES.OK,
      responseText: RESPONSE_TEXT.SUCCESS,
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      statusCode: STATUS_CODES.BAD_REQUEST,
      responseText: RESPONSE_TEXT.FAIL,
      errors: [{ msg: error.message || "something went wrong" }],
    });
  }
};
exports.getAComment = async (req, res) => {
  try {
    const data = await getOne(
      req,
      res,
      Comment,
      ["__v"],
      populate,
      "Comment Fetched successfully"
    );

    res.status(STATUS_CODES.OK).json({
      statusCode: STATUS_CODES.OK,
      responseText: RESPONSE_TEXT.SUCCESS,
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      statusCode: STATUS_CODES.BAD_REQUEST,
      responseText: RESPONSE_TEXT.FAIL,
      errors: [{ msg: error.message || "something went wrong" }],
    });
  }
};

exports.createComment = async (req, res) => {
  try {
    await validationCheck(req, res);
    req.body.user = req.user.id;

    //check if req.body.post is a valid object
    if (!isValidObjectId(req.body.post)) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        statusCode: STATUS_CODES.BAD_REQUEST,
        responseText: RESPONSE_TEXT.FAIL,
        errors: [{ msg: "Invalid objectId passed" }],
      });
    }

    //check if post exists
    const post = await Post.findById(req.body.post);
    if (!post) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        statusCode: STATUS_CODES.NOT_FOUND,
        responseText: RESPONSE_TEXT.FAIL,
        errors: [{ msg: "Post not found" }],
      });
    }
    const data = await createDocument(
      req,
      res,
      Comment,
      {},
      "Comment created successfully"
    );
    console.log(data);
    post.comments.push(data.resource._id);
    await post.save();
    res.status(STATUS_CODES.CREATED).json({
      statusCode: STATUS_CODES.CREATED,
      responseText: RESPONSE_TEXT.SUCCESS,
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      statusCode: STATUS_CODES.BAD_REQUEST,
      responseText: RESPONSE_TEXT.FAIL,
      errors: [{ msg: error.message || "something went wrong" }],
    });
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

    const data = await updateDocument(
      req,
      res,
      Comment,
      "Comment updated successfully"
    );

    res.status(STATUS_CODES.OK).json({
      statusCode: STATUS_CODES.OK,
      responseText: RESPONSE_TEXT.SUCCESS,
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      statusCode: STATUS_CODES.BAD_REQUEST,
      responseText: RESPONSE_TEXT.FAIL,
      errors: [{ msg: error.message || "something went wrong" }],
    });
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

    const data = await deleteDocument(
      req,
      res,
      Comment,
      "Comment deleted successfully"
    );
    res.status(STATUS_CODES.OK).json({
      statusCode: STATUS_CODES.OK,
      responseText: RESPONSE_TEXT.SUCCESS,
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(STATUS_CODES.BAD_REQUEST).json({
      statusCode: STATUS_CODES.BAD_REQUEST,
      responseText: RESPONSE_TEXT.FAIL,
      errors: [{ msg: error.message || "something went wrong" }],
    });
  }
};
