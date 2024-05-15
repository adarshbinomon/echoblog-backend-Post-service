import { Request, Response } from "express";
import { Dependencies } from "../../../utils/interfaces/dependency.interface";
import { HttpStatus } from "../../../utils/enums/http.statuscodes";

export default (dependencies: Dependencies) => {
  const {
    useCase: { editCommentUseCase },
  } = dependencies;

  const editCommentController = async (req: Request, res: Response) => {
    try {
      const { postId } = req.params;
      const commentData = req.body;

      const response = await editCommentUseCase(dependencies).executeFunction(
        postId,
        commentData
      );

      if (response.status) {
        res.status(HttpStatus.CREATED).json({ status: true, message: response.message });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ status: true, message: response.message });
      }
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ status: true, message: "error in editing comment" });
    }
  };
  return editCommentController;
};
