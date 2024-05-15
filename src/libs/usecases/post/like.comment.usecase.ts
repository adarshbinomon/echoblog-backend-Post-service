import { Dependencies } from "../../../utils/interfaces/dependency.interface";

export const likeCommentUseCase = (dependencies: Dependencies) => {
  const {
    repository: { postRepository },
  } = dependencies;

  const executeFunction = async (
    postId: string,
    commentId: string,
    userId: string,
    isLiked: boolean
  ) => {
    try {
      const response = await postRepository.likeComment(
        postId,
        commentId,
        userId,
        isLiked
      );
      if (response.status) {
        return { status: true, message: response.message };
      } else {
        return { status: false, message: response.message };
      }
    } catch (error) {
      console.log("error in like comment usecase:", error);
      return { status: false, message: "error in liking comment" };
    }
  };
  return { executeFunction };
};
