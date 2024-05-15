import { Request, Response } from "express";
import { Dependencies } from "../../../utils/interfaces/dependency.interface";
import { HttpStatus } from "../../../utils/enums/http.statuscodes";

export default (dependencies: Dependencies) => {
  const {
    useCase: { reportPostUseCase },
  } = dependencies;

  const reportPostController = async (req: Request, res: Response) => {
    try {
      const reportObject = req.body;
      const { postId } = req.params;

      const response = await reportPostUseCase(dependencies).executeFunction(
        postId,
        reportObject
      );

      if (response.status) {
        res.status(HttpStatus.CREATED).json({ status: true, message: response.message });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ status: true, message: response.message });
      }
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ status: true, message: "error i reporting post" });
    }
  };
  return reportPostController;
};
