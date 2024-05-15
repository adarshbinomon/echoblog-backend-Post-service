import { Request, Response } from "express";
import { Dependencies } from "../../../utils/interfaces/dependency.interface";
import { HttpStatus } from "../../../utils/enums/http.statuscodes";

export default (dependencies: Dependencies) => {
  const {
    useCase: { addComment_Usecase },
  } = dependencies;
  const addCommentController = async (req: Request, res: Response) => {
    try {
      const postId = req.params.postId;
      const comment = req.body;
      const response = await addComment_Usecase(dependencies).executeFunction(
        postId,
        comment
      );

      if (response.status) {
        res.status(HttpStatus.CREATED).json({ status: true, message: "comment added", comment: response.comment });
      } else {
        res.status(HttpStatus.CREATED).json({ status: false, message: "comment not added" });
      }
    } catch (error) {
      console.log("error in add comment controller:", error);

      res.status(HttpStatus.CREATED).json({ status: false, message: "comment not added" });
    }
  };
  return addCommentController;
};
