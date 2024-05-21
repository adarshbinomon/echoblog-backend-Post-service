import express from "express";
import { postController } from "../../libs/controllers";
import { verifyUser } from "../../utils/jwt/verify.user";
import { Dependencies } from "../../utils/interfaces/dependency.interface";
import { verifyAdmin } from "../../utils/jwt/verify.admin";

export default (dependencies: Dependencies) => {
  const router = express();

  const {
    createPostController,
    getUserPostsController,
    getPostController,
    editPostController,
    deletePostController,
    getAllPostsController,
    likePostController,
    addCommentController,
    updatePostStatusAdminController,
    getAllPostsAdminController,
    getUserCommunityPostController,
    getCommunityPostsController,
    replyToCommentController,
    editCommentController,
    likeCommentController,
    deleteCommentController,
    searchPostController,
    reportPostController,
    getSavedPostsController,
    getPostsFromFollowingController,
    getMonthlyPostCountController,
    getPostsFromCommunityController,
  } = postController(dependencies);

  //admin routes

  router.put("/update-post-status/:postId", updatePostStatusAdminController);
  router.get("/all-posts", verifyAdmin, getAllPostsAdminController);
  router.get("/post-chart-data", verifyAdmin, getMonthlyPostCountController);

  //user routes

  router.get("/posts", verifyUser, getAllPostsController);
  router.post("/create", createPostController);
  router.get("/get-posts/:id", verifyUser, getUserPostsController);
  router.get("/:id", verifyUser, getPostController);
  router.put("/edit-post/:id", editPostController);
  router.get("/delete-post/:id", deletePostController);
  router.post("/like-post/:postId", likePostController);
  router.post("/comment-post/:postId", addCommentController);
  router.get(
    "/get-user-community-post/:userId",
    getUserCommunityPostController
  );
  router.get(
    "/get-community-posts/:communityId",
    verifyUser,
    getCommunityPostsController
  );
  router.post(
    "/reply-to-comment/:postId",

    replyToCommentController
  );
  router.put("/edit-comment/:postId", verifyUser, editCommentController);
  router.post("/like-comment/:commentId", verifyUser, likeCommentController);
  router.post("/delete-comment/:postId", verifyUser, deleteCommentController);
  router.get("/search-post/:regex", verifyUser, searchPostController);
  router.post("/report-post/:postId", verifyUser, reportPostController);
  router.post("/get-saved-posts", verifyUser, getSavedPostsController);
  router.post(
    "/posts-from-following",
    verifyUser,
    getPostsFromFollowingController
  );
  router.post(
    "/posts-from-community",
    verifyUser,
    getPostsFromCommunityController
  );

  return router;
};
