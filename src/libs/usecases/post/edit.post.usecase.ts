import { Dependencies } from "../../../utils/interfaces/dependency.interface";
import { PostData } from "../../../utils/interfaces/interface";

export const editPost_useCase = (dependencies: Dependencies) => {
  const {
    repository: { postRepository },
  } = dependencies;

  const executeFunction = async (id: string, data: PostData) => {
    try {
      const response = await postRepository.editPost(id, data);

      if (response.status) {
        return {
          status: true,
          message: response.message,
          updatedPost: response.updatedPost,
        };
      } else {
        return {
          status: false,
          message: response?.message ?? "Unknown error occurred",
        };
      }
    } catch (error) {
      console.error("Error in updatePost_UseCase:", error);
      return { status: false, message: `Error in updatePost_UseCase` };
    }
  };

  return { executeFunction };
};
