import mongoose from "mongoose";
enum postType {
  "Free",
  "Exclusive",
}

const replySchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: new mongoose.Types.ObjectId(),
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  userName: {
    type: String,
  },
  name: {
    type: String,
  },
  reply: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const commentSchema = new mongoose.Schema({
  // _id: {
  //   type: mongoose.Schema.Types.ObjectId,
  // },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  userName: {
    type: String,
  },
  comment: {
    type: String,
  },
  name: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  replies: [replySchema],
  likes: Array,
});

const postSchema = new mongoose.Schema({
  // _id: {
  //   type: String,
  // },
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  image: {
    type: Array,
  },
  like: {
    type: Array,
  },
  comment: [commentSchema],
  postType: {
    type: String,
    enum: postType,
  },
  createdBy: {
    type: String,
    ref: "User",
  },
  tags: {
    type: String,
  },
  createdOn: {
    type: Date,
    default: Date.now(),
  },
  reportedUsersList: {
    type: Array,
  },
  communityId: {
    type: String,
    ref: "Community",
  },
  visibility: {
    type: Boolean,
    default: true,
  },
});

const Post = mongoose.model("Post", postSchema);

export { Post };
