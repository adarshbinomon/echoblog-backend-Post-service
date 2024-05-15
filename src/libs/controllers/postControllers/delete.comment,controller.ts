import { Request, Response } from "express";
import { Dependencies } from "../../../utils/interfaces/dependency.interface";
import { HttpStatus } from "../../../utils/enums/http.statuscodes";

export default (dependencies: Dependencies) => {
  const {
    useCase: { deleteCommentUseCase },
  } = dependencies;

  const deleteCommentController = async (req: Request, res: Response) => {
    try {
      const { postId } = req.params;
      const { commentId } = req.body;

      const response = await deleteCommentUseCase(dependencies).executeFunction(
        postId,
        commentId
      );
      if (response.status) {
        res.status(HttpStatus.OK).json({ status: true, message: response.message });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ status: false, message: response.message });
      }
    } catch (error) {
      console.log("error in delete comment controller:", error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ status: false, message: "error in deleting comment" });
    }
  };
  return deleteCommentController;
};
