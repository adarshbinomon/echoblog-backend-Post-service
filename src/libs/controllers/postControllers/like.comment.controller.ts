import { Request, Response, response } from "express";
import { Dependencies } from "../../../utils/interfaces/dependency.interface";
import { HttpStatus } from "../../../utils/enums/http.statuscodes";

export default (dependencies: Dependencies) => {
  const {
    useCase: { likeCommentUseCase },
  } = dependencies;

  const likeCommentController = async (req: Request, res: Response) => {
    try {
      const { commentId } = req.params;
      const { postId, userId, isLiked } = req.body;
      
      const response = await likeCommentUseCase(dependencies).executeFunction(
        postId,
        commentId,
        userId,
        isLiked
      );
      console.log(response)

      if (response.status) {
        res.status(HttpStatus.CREATED).json({ status: true, message: response.message });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ status: false, message: response.message });
      }
    } catch (error) {
      console.log("error in like comment controller:", error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ status: false, message: "errror in liking comment" });
    }
  };
  return likeCommentController;
};
