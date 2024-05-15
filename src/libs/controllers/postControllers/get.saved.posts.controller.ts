import { Request, Response } from "express";
import { Dependencies } from "../../../utils/interfaces/dependency.interface";
import { HttpStatus } from "../../../utils/enums/http.statuscodes";

export default (dependencies: Dependencies) => {
  const {
    useCase: { getSavedPostsUseCase },
  } = dependencies;

  const getSavedPostsController = async (req: Request, res: Response) => {
    try {
      const { savedPosts } = req.body;
      

      const response = await getSavedPostsUseCase(dependencies).executeFunction(
        savedPosts
      );

      if (response.status) {
        res.status(HttpStatus.OK).json({
          status: true,
          message: response.message,
          posts: response.posts,
        });
      } else {
        res.status(HttpStatus.NOT_FOUND).json({ status: false, message: response.message });
      }
    } catch (error) {
      console.log("error in getting saved posts controller:", error);
      res
        .status(HttpStatus.NOT_FOUND)
        .json({ status: false, message: "error in getting posts" });
    }
  };
  return getSavedPostsController;
};
