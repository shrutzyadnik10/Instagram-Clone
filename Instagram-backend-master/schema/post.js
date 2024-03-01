const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PostSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  post_image: String,
  likes: [],
  comments: [
    {
      userId: ObjectId,
      comment: String,
      userName: String,
      profile_image: String,
    },
  ],
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
