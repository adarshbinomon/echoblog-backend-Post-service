import { Request, Response } from "express";
import { Dependencies } from "../../../utils/interfaces/dependency.interface";
import { HttpStatus } from "../../../utils/enums/http.statuscodes";

export default (dependencies: Dependencies) => {
  const {
    useCase: { deletePost_useCase },
  } = dependencies;

  const deletePostController = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      const response = await deletePost_useCase(dependencies).executeFunction(
        id
      );

      if (response.status) {
        res
          .status(HttpStatus.NO_CONTENT)
          .json({ status: true, message: "post deleted succesfully." });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ status: false, messge: "post deletion failed" });
      }
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ status: false, messge: "post deletion failed" });
    }
  };
  return deletePostController;
};
