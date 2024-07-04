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

exports.getAllPosts = async (req, res) => {
  try {
    getAll(req, res, Post);
  } catch (error) {
    console.log(error);
  }
};
exports.getAPost = async (req, res) => {
  try {
    getOne(req, res, Post);
  } catch (error) {
    console.log(error);
  }
};

exports.createPost = async (req, res) => {
  try {
    await validationCheck(req, res);
    req.body.user = req.user.id;
    const created = await createDocument(
      req,
      res,
      Post,
      {},
      "Post created successfully"
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
    updateDocument(req, res, Post, "Post updated successfully");
  } catch (error) {
    console.log(error);
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
    deleteDocument(req, res, Post, "Post deleted successfully");
  } catch (error) {
    console.log(error);
  }
};
