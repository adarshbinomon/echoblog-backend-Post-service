import { Dependencies } from "../../../utils/interfaces/dependency.interface";

export const updataPostStatus_useCase = (dependencies: Dependencies) => {
  const {
    repository: { postRepository },
  } = dependencies;

  const executeFunction = async (postId: string) => {
    try {
      const response = await postRepository.updatePostStatus(postId);

      if (response.status) {
        return { status: true, message: response.message, post: response.post };
      } else {
        return { status: false, message: response.message };
      }
    } catch (error) {
      console.log("error in change post status usecase:", error);
      return { status: false, message: "status change failed" };
    }
  };
  return { executeFunction };
};
