import mongoose, { Types } from "mongoose";
import {
  CommentObject,
  UserData,
  PostData,
  reportObject,
} from "../../../utils/interfaces/interface";
import { schema } from "../database";
const { ObjectId } = mongoose.Types;

const { User, Post } = schema;

export default {
  createUser: async (data: UserData) => {
    try {
      const userData = { ...data };

      const response = await schema.User.create(userData);

      if (response) {
        return { status: true, message: "user created sucessfully", response };
      } else {
        return { status: false, message: "user creation failed" };
      }
    } catch (error) {
      console.log(
        "Error in the creating user in the post service / repository ",
        error
      );
    }
  },

  createPost: async (data: PostData) => {
    try {
      const post = { ...data, createdOn: Date.now() };

      const response = await schema.Post.create(post);

      if (response) {
        return {
          status: true,
          message: "Post created successfully",
          post: response,
        };
      } else {
        return {
          status: false,
          message: "error in post service repository - createPost-1 ",
        };
      }
    } catch (error) {
      console.log(error, "error in post service repository- createPost");
      return {
        status: false,
        message: "error in post service repository - createPost ",
      };
    }
  },

  findPosts: async (id: string) => {
    try {
      const response = await schema.Post.find({
        createdBy: id,
        communityId: { $exists: false },
      }).populate("createdBy");
      if (response) {
        return { status: true, message: "posts found", posts: response };
      } else {
        return { status: false, message: "posts not found" };
      }
    } catch (error) {
      console.log("error in find post repository", error);

      return { status: false, message: "posts not found" };
    }
  },

  getPost: async (id: string) => {
    try {
      const response = await schema.Post.findById(id);

      if (response) {
        return { status: true, message: "post found", post: response };
      } else {
        return { status: false, message: "post not found" };
      }
    } catch (error) {
      console.log("error in find post repository", error);

      return { status: false, message: "post not found" };
    }
  },

  updateUser: async (data: UserData) => {
    try {
      const response = await User.findByIdAndUpdate(data._id, data);
      return { status: true, updatedUser: response };
    } catch (error) {
      console.log(error);
      return { status: false, message: "update failed" };
    }
  },

  findUser: async (id: UserData) => {
    try {
      const response = await User.findById(id);
      return { status: true, user: response };
    } catch (error) {
      return { status: false, message: "user not found" };
    }
  },

  editPost: async (id: string, data: PostData) => {
    try {
      const response = await Post.findByIdAndUpdate(id, {
        content: data.content,
      });

      return { status: true, updatedPost: response };
    } catch (error) {
      console.log("error in updatePost repository");
      return { status: false, message: "post update failed" };
    }
  },

  deletePost: async (id: string) => {
    try {
      const response = await Post.findByIdAndDelete(id);
      return { status: true, message: "post deleted successfully." };
    } catch (error) {
      console.log("error:", error);
      return { status: false, message: "post deletion failed!" };
    }
  },

  getAllPosts: async (offset: number) => {
    try {
      const response = await Post.find({ visibility: true })
        .sort({ createdOn: -1 })
        .populate("createdBy")
        .limit(4)
        .skip(offset);

      return {
        status: true,
        message: "Posts found successfully",
        posts: response,
      };
    } catch (error) {
      return { status: false, message: "Posts not found" };
    }
  },

  getAllPostsForAdmin: async () => {
    try {
      const response = await Post.find().populate("createdBy");
      return {
        status: true,
        message: "posts found successfully",
        posts: response,
      };
    } catch (error) {
      return { status: false, message: "post not found" };
    }
  },

  likePost: async (postId: string, userId: string, liked: boolean) => {
    try {
      if (!liked) {
        const response = await Post.findByIdAndUpdate(
          postId,
          {
            $push: { like: userId },
          },
          { new: true }
        );
        return {
          status: true,
          message: "like added",
          likes: response?.like.length,
        };
      } else {
        const response = await Post.findByIdAndUpdate(
          postId,
          {
            $pull: { like: userId },
            new: true,
          },
          { new: true }
        );
        return {
          status: true,
          message: "like removed",
          likes: response?.like.length,
        };
      }
    } catch (error) {
      console.log("error in like post repository:", error);

      return { status: false, message: "like unsuccessfull" };
    }
  },

  addComment: async (postId: string, comment: CommentObject) => {
    try {
      const response = await Post.findByIdAndUpdate(
        postId,
        {
          $push: { comment: comment },
        },
        { new: true }
      );
      return {
        status: true,
        message: "comment added successfully",
        comment: response?.comment,
      };
    } catch (error) {
      console.log("eeror:", error);

      return { status: false, message: "comment add failed" };
    }
  },

  updatePostStatus: async (postId: string) => {
    try {
      const post = await Post.findById(postId);

      if (!post) {
        console.log("post not found");
        return;
      }

      post.visibility = !post.visibility;
      await post.save();
      if (post) {
        return { status: true, message: "poststatus changed", post: post };
      } else {
        return { status: false, message: "poststatus change failed" };
      }
    } catch (error) {
      console.error("Error toggling isActive:", error);
    }
  },

  findUserCommunityPosts: async (id: string) => {
    try {
      const response = await Post.find({
        createdBy: id,
        communityId: { $exists: true },
      }).populate("createdBy");
      if (response) {
        return { status: true, message: "posts found", posts: response };
      } else {
        return { status: false, message: "posts not found" };
      }
    } catch (error) {
      console.log("error in find post repository", error);

      return { status: false, message: "posts not found" };
    }
  },

  findCommunityPosts: async (communityId: string) => {
    try {
      const response = await Post.find({ communityId: communityId }).populate(
        "createdBy"
      );

      if (response) {
        return { status: true, message: "posts found", posts: response };
      } else {
        return { status: false, message: "posts not found" };
      }
    } catch (error) {
      console.log("error in find community posts repository:", error);
      return { status: false, message: "posts not found" };
    }
  },

  replyToComment: async (postId: string, commentData: CommentObject) => {
    try {
      const post = await Post.findById(postId);
      const commentId = commentData.commentId;

      if (!post) {
        return { status: false, message: "Post not found" };
      }

      const comment = post.comment.find(
        (comment) => comment?._id?.toString() === commentId
      );

      if (!comment) {
        return { status: false, message: "Comment not found" };
      }

      comment.replies.push(commentData);
      const replies = await post.save();

      if (replies) {
        return { status: true, message: "Reply added", comment };
      }
    } catch (error) {
      console.log("error in reply to comment repository:", error);
      return { status: false, message: "error in adding reply" };
    }
  },

  editComment: async (postId: string, commentData: CommentObject) => {
    try {
      const commentId = commentData.commentId;

      const post = await Post.findById(postId);

      if (!post) {
        return { status: false, message: "Post not found" };
      }

      const comment = post.comment.find(
        (comment) => comment._id?.toString() === commentId
      );

      if (!comment) {
        return { status: false, message: "Comment not found" };
      }

      comment.comment = commentData.editedComment;

      const newComment = await post.save();
      if (newComment) {
        return { status: true, message: "comment edit successful" };
      }
    } catch (err) {
      console.log("error in edit comment repository", err);
      return { status: false, message: "comment edit unsuccessfull" };
    }
  },

  likeComment: async (
    postId: string,
    commentId: string,
    userId: string,
    isLiked: boolean
  ) => {
    try {
      if (!isLiked) {
        const post = await Post.findById(postId);

        if (!post) {
          return { status: false, message: "Post not found" };
        }

        const comment = post.comment.find(
          (comment) => comment._id?.toString() === commentId
        );

        if (!comment) {
          return { status: false, message: "Comment not found" };
        }

        comment.likes.push(userId);

        const liked = await post.save();
        if (liked) {
          return { status: true, message: "comment liked" };
        }
      } else {
        const post = await Post.findById(postId);

        if (!post) {
          return { status: false, message: "Post not found" };
        }

        const comment = post.comment.find(
          (comment) => comment._id?.toString() === commentId
        );

        if (!comment) {
          return { status: false, message: "Comment not found" };
        }

        comment.likes = comment.likes.filter((el) => el !== userId);

        const liked = await post.save();
        if (liked) {
          return { status: true, message: "comment liked" };
        }
      }
    } catch (error) {
      console.log("error in  comment like repository", error);
      return { status: false, message: "comment like unsuccessfull" };
    }
  },

  deleteComment: async (postId: string, commentId: string) => {
    try {
      const response = await Post.findByIdAndUpdate(
        postId,
        {
          $pull: { comment: { _id: commentId } },
        },
        { new: true }
      );

      if (response) {
        return { status: true, message: "comment deleted" };
      } else {
        return { status: false, message: "comment not deleted" };
      }
    } catch (error) {
      console.log("error in delete comment repository:", error);
      return { status: false, message: "comment not deleted" };
    }
  },

  searchPost: async (regex: string) => {
    try {
      const posts = await Post.find({
        title: { $regex: new RegExp(`${regex}`, "i") },
      });

      if (posts) {
        return { status: true, message: "posts found", posts: posts };
      } else {
        return { status: false, message: "posts not found" };
      }
    } catch (error) {
      console.log("error in search post repository:", error);
      return { status: true, message: "error in findinf posts" };
    }
  },

  reportPost: async (postId: string, reportObject: reportObject) => {
    try {
      const response = await Post.findByIdAndUpdate(postId, {
        $push: { reportedUsersList: reportObject },
      });

      if (response) {
        return { status: true, message: "reported successfully" };
      } else {
        return { status: false, message: "report unsuccessfull" };
      }
    } catch (error) {
      console.log("error in report post repository", error);
      return { status: false, message: "report unsuccessfull" };
    }
  },

  getSavedPosts: async (savedPosts: [string]) => {
    try {
      const posts = await Post.find({ _id: { $in: savedPosts } }).populate(
        "createdBy"
      );

      if (posts) {
        return { status: true, message: "posts found", posts: posts };
      } else {
        return { status: false, message: "posts not found" };
      }
    } catch (error) {
      console.log("error in get saved posts repository", error);
      return { status: false, message: "posts not found" };
    }
  },

  getPostsFromFollowing: async (following: string[], offset: number) => {
    try {
      const posts = await Post.find({ createdBy: { $in: following } })
        .sort({ createdOn: -1 })
        .populate("createdBy")
        .limit(4)
        .skip(offset);

      if (posts) {
        return { status: true, messsage: "posts found", posts };
      } else {
        return { status: false, messsage: "posts not found" };
      }
    } catch (error) {
      return { status: false, messsage: "posts not found" };
    }
  },

  getPostsFromCommunity: async (community: string[], offset: number) => {
    try {
      console.log("community", community);

      const posts = await Post.find({
        communityId: { $in: community },
      })
        .sort({ createdOn: -1 })
        .populate("createdBy")
        .limit(4)
        .skip(offset);

      if (posts.length > 0) {
        return { status: true, messsage: "posts found", posts };
      } else {
        return { status: false, messsage: "posts not found" };
      }
    } catch (error) {
      return { status: false, messsage: "posts not found" };
    }
  },

  getMonthlyPostCount: async () => {
    try {
      const postsPerMonth = await Post.aggregate([
        {
          $group: {
            _id: { $month: "$createdOn" },
            count: { $sum: 1 },
          },
        },
        {
          $sort: { _id: 1 },
        },
      ]);

      const resultArray = postsPerMonth.map((item) => ({
        x: item._id,
        y: item.count,
      }));

      if (postsPerMonth) {
        return {
          status: true,
          message: "count successful",
          postsPerMonth: resultArray,
        };
      }
    } catch (error) {
      console.log("error in get monthlyPostCount repo", error);
      return { status: false, message: "count unsuccessful" };
    }
  },
};
