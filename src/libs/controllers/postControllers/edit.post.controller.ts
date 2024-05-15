import { Request, Response } from "express";
import { Dependencies } from "../../../utils/interfaces/dependency.interface";
import { HttpStatus } from "../../../utils/enums/http.statuscodes";

export default (dependencies: Dependencies) => {
  const {
    useCase: { editPost_useCase },
  } = dependencies;

  const editPostController = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const data = req.body;

      const response = await editPost_useCase(dependencies).executeFunction(
        id,
        data
      );

      if (response.status) {
        res
          .status(HttpStatus.CREATED)
          .json({ status: true, message: "post updated successfully" });
      } else {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ status: false, message: "post update unsuccessful" });
      }
    } catch (error) {
      console.log(error);

      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ status: false, message: "post update unsuccessful" });
    }
  };
  return editPostController;
};
