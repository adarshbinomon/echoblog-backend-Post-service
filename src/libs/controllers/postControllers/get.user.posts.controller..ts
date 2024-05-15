import { Request, Response } from "express";
import { Dependencies } from "../../../utils/interfaces/dependency.interface";
import { HttpStatus } from "../../../utils/enums/http.statuscodes";

export default (dependencies: Dependencies) => {
  const {
    useCase: { findUserPosts_useCase },
  } = dependencies;

  const getUserPostsController = async (req: Request, res: Response) => {
    try {
      const userId = req.params.id;

      const response = await findUserPosts_useCase(
        dependencies
      ).executeFunction(userId);
      if (response.status) {
        res.status(HttpStatus.OK).json({
          status: true,
          message: "posts found",
          posts: response.posts,
        });
      } else {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ status: false, message: "error in finding posts" });
      }
    } catch (error) {
      console.log("error", error);

      res
        .status(HttpStatus.NOT_FOUND)
        .json({ status: false, message: "error in finding posts" });
    }
  };
  return getUserPostsController;
};
