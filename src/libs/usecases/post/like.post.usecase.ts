import { Dependencies } from "../../../utils/interfaces/dependency.interface";

export const likePost_useCase = (dependencies: Dependencies) => {
  const {
    repository: { postRepository },
  } = dependencies;

  const executeFunction = async (
    postId: string,
    userId: string,
    liked: boolean
  ) => {
    try {
      const response = await postRepository.likePost(postId, userId, liked);
      if (response.status) {
        return {
          status: true,
          message: response.message,
          likes: response?.likes,
        };
      } else {
        return {
          status: false,
          message: response.message,
          likes: response?.likes,
        };
      }
    } catch (error) {
      return { status: false, message: "error in like post useCase" };
    }
  };
  return { executeFunction };
};
