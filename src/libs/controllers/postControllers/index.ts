import createPost_controller from "./create.post.controller";
import getUserPosts_controller from "./get.user.posts.controller.";
import getPost_Controller from "./get.post.controller";
import editPost_controller from "./edit.post.controller";
import deletePost_controller from "./delete.post.controller";
import getAllPosts_Controller from "./get.all.posts.controller";
import likePost_Controller from "./like.post.controller";
import addComment_controller from "./add.comment.controller";
import updatePostStatusAdmin_controller from "./update.post.status.admin.controller";
import getAllPostsAdmin_Controller from "./get.all.posts.admin.controller";
import getUserCommunityPost_controller from "./get.user.community.post.controller";
import getCommunityPosts_controller from "./get.community.posts.controller";
import replyToCommentController from "./reply.to.comment.controller";
import editCommentController from "./edit.comment.controller";
import likeCommentController from "./like.comment.controller";
import deleteCommentController from "./delete.comment,controller";
import searchPostController from "./search.post.controller";
import reportPostController from "./report.post.controller";
import getSavedPostsController from "./get.saved.posts.controller";
import { Dependencies } from "../../../utils/interfaces/dependency.interface";
import getPostsFromFollowingController from "./get.posts.from.following.controller";
import getMonthlyPostCountController from "./get.monthly.post.count.controller";
import getPostsFromCommunityController from "./get.posts.from.community.controller";

export default (dependencies: Dependencies) => {
  return {
    createPostController: createPost_controller(dependencies),
    getUserPostsController: getUserPosts_controller(dependencies),
    getPostController: getPost_Controller(dependencies),
    editPostController: editPost_controller(dependencies),
    deletePostController: deletePost_controller(dependencies),
    getAllPostsController: getAllPosts_Controller(dependencies),
    likePostController: likePost_Controller(dependencies),
    addCommentController: addComment_controller(dependencies),
    updatePostStatusAdminController:
      updatePostStatusAdmin_controller(dependencies),
    getAllPostsAdminController: getAllPostsAdmin_Controller(dependencies),
    getUserCommunityPostController:
      getUserCommunityPost_controller(dependencies),
    getCommunityPostsController: getCommunityPosts_controller(dependencies),
    replyToCommentController: replyToCommentController(dependencies),
    editCommentController: editCommentController(dependencies),
    likeCommentController: likeCommentController(dependencies),
    deleteCommentController: deleteCommentController(dependencies),
    searchPostController: searchPostController(dependencies),
    reportPostController: reportPostController(dependencies),
    getSavedPostsController: getSavedPostsController(dependencies),
    getPostsFromFollowingController:
      getPostsFromFollowingController(dependencies),
    getMonthlyPostCountController: getMonthlyPostCountController(dependencies),
    getPostsFromCommunityController:
      getPostsFromCommunityController(dependencies),
  };
};
