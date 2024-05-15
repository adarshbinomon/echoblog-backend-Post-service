import { Request, Response } from "express";
import { Dependencies } from "../../../utils/interfaces/dependency.interface";
import { HttpStatus } from "../../../utils/enums/http.statuscodes";

export default (dependencies: Dependencies) => {
  const {
    useCase: { updataPostStatus_useCase },
  } = dependencies;

  const updatePostStatusAdminController = async (
    req: Request,
    res: Response
  ) => {
    try {
      const postId = req.params.postId;

      const response = await updataPostStatus_useCase(
        dependencies
      ).executeFunction(postId);

      if (response.status) {
        res.status(HttpStatus.OK).json({
          status: true,
          message: response.message,
          post: response.post,
        });
      } else {
        res.status(HttpStatus.NOT_FOUND).json({ status: false, message: response.message });
      }
    } catch (error) {
      console.log("error in update post status controller:", error);
      res
        .status(HttpStatus.NOT_FOUND)
        .json({ status: false, message: "error in changing status" });
    }
  };
  return updatePostStatusAdminController;
};
