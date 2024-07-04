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

const { Post } = require("../models/post");

const populate = {
  required: true,
  field: "user",
  columns: "name -_id",
};

exports.getAllPosts = async (req, res) => {
  try {
    const data = await getAll(
      req,
      res,
      Post,
      ["__v"],
      populate,
      "Posts Fetched successfully"
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
exports.getAPost = async (req, res) => {
  try {
    const data = await getOne(
      req,
      res,
      Post,
      ["__v"],
      populate,
      "Post Fetched successfully"
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

exports.createPost = async (req, res) => {
  try {
    await validationCheck(req, res);
    req.body.user = req.user.id;
    const data = await createDocument(
      req,
      res,
      Post,
      {},
      "Post created successfully"
    );
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

exports.updatePost = async (req, res) => {
  try {
    const isUserPost = await Post.findOne({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!isUserPost) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        statusCode: STATUS_CODES.BAD_REQUEST,
        responseText: RESPONSE_TEXT.FAIL,
        errors: [{ msg: "You can only update a Post that belongs to you" }],
      });
    }
    const data = await updateDocument(
      req,
      res,
      Post,
      "Post updated successfully"
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

exports.deletePost = async (req, res) => {
  try {
    const isUserPost = await Post.findOne({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!isUserPost) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        statusCode: STATUS_CODES.BAD_REQUEST,
        responseText: RESPONSE_TEXT.FAIL,
        errors: [{ msg: "You can only update a Post that belongs to you" }],
      });
    }
    const data = await deleteDocument(
      req,
      res,
      Post,
      "Post deleted successfully"
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
