import { Request, Response } from "express";
import { Dependencies } from "../../../utils/interfaces/dependency.interface";
import { HttpStatus } from "../../../utils/enums/http.statuscodes";

export default (dependencies: Dependencies) => {
  const {
    useCase: { searchPostUseCase },
  } = dependencies;

  const searchPostController = async (req: Request, res: Response) => {
    try {
      const { regex } = req.params;

      const response = await searchPostUseCase(dependencies).executeFunction(
        regex
      );

      if (response.status) {
        res.status(HttpStatus.OK).json({
          status: true,
          message: response.message,
          posts: response.posts,
        });
      } else {
        res.status(HttpStatus.NOT_FOUND).json({
          status: false,
          message: response.message,
        });
      }
    } catch (error) {
      console.log("error in search post controller:", error);
      res.status(HttpStatus.NOT_FOUND).json({
        status: false,
        message: "error in finding post",
      });
    }
  };
  return searchPostController;
};
