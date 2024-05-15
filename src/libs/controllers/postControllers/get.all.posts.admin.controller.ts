import { Request, Response } from "express";
import {  Dependencies } from "../../../utils/interfaces/dependency.interface";
import { HttpStatus } from "../../../utils/enums/http.statuscodes";

export default (dependencies: Dependencies) => {
  const {
    useCase: { getAllPostsAdmin_useCase },
  } = dependencies;
  const getAllPostsAdminController = async (req: Request, res: Response) => {
    try {
      
      const response = await getAllPostsAdmin_useCase(
        dependencies
      ).executeFunction();

      if (response.status) {
        res.status(HttpStatus.OK).json({
          status: true,
          posts: response.posts,
          message: response.message,
        });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ status: false, message: response.message });
      }
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ status: false, message: "posts not found" });
    }
  };
  return getAllPostsAdminController;
};
