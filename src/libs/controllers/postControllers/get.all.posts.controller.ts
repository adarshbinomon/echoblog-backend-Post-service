import { Request, Response } from "express";
import { Dependencies } from "../../../utils/interfaces/dependency.interface";
import { HttpStatus } from "../../../utils/enums/http.statuscodes";

export default (dependencies: Dependencies) => {
  const {
    useCase: { getAllPosts_useCase },
  } = dependencies;
  const getAllPostsController = async (req: Request, res: Response) => {
    try {
      const { offset } = req.query;
      const response = await getAllPosts_useCase(
        dependencies
      ).executeFunction(offset,);

      if (response.status) {
        res.status(HttpStatus.OK).json({
          status: true,
          posts: response.posts,
          message: response.message,
        });
      } else {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ status: false, message: response.message });
      }
    } catch (error) {
      console.log("error in get all post controller ", error);

      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ status: false, message: "posts not found" });
    }
  };
  return getAllPostsController;
};
