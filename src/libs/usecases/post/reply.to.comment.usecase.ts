import { Dependencies } from "../../../utils/interfaces/dependency.interface";
import { CommentObject } from "../../../utils/interfaces/interface";

export const replyToComment_useCase = (dependencies: Dependencies) => {
  const {
    repository: { postRepository },
  } = dependencies;

  const executeFunction = async (postId: string, commentData: CommentObject) => {
    try {
      const response = await postRepository.replyToComment(postId, commentData);
      if (response.status) {
        return { status: true, message: response.message };
      } else {
        return { status: false, message: response.message };
      }
    } catch (error) {}
  };

  return { executeFunction };
};
