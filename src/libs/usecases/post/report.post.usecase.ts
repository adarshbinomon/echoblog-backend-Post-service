import { Dependencies } from "../../../utils/interfaces/dependency.interface";
import { reportObject } from "../../../utils/interfaces/interface";

export const reportPostUseCase = (dependencies: Dependencies) => {
  const {
    repository: { postRepository },
  } = dependencies;

  const executeFunction = async (
    postId: string,
    reportObject: reportObject
  ) => {
    try {
      const response = await postRepository.reportPost(postId, reportObject);
      if (response.status) {
        return { status: true, message: response.message };
      } else {
        return { status: false, message: response.message };
      }
    } catch (error) {
      console.log("erorr in report post usecase:", error);
      return { status: false, message: "error in reporrting post" };
    }
  };
  return { executeFunction };
};
