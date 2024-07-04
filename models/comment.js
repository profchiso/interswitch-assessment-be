const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
  body: {
    type: String,
    required: true,
  },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

exports.Comment = model("Comment", commentSchema);
