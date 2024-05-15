import { Dependencies } from "../../../utils/interfaces/dependency.interface";

export const deletePost_useCase = (dependencies: Dependencies) => {
  const {
    repository: { postRepository },
  } = dependencies;

  const executeFunction = async (id: string) => {
    try {
      const response = await postRepository?.deletePost(id);
      if (response.status) {
        return { status: true, message: response.message };
      } else {
        return { status: false, message: response.message };
      }
    } catch (error) {
      console.log("error:", error);

      return { status: false, message: "error in delete post usecase" };
    }
  };
  return { executeFunction };
};
