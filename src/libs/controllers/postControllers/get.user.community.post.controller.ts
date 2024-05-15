import { Request, Response } from "express";
import { Dependencies } from "../../../utils/interfaces/dependency.interface";
import { HttpStatus } from "../../../utils/enums/http.statuscodes";

export default (dependencies: Dependencies) => {
  const {
    useCase: { getUserCommunityPost_useCase },
  } = dependencies;

  const getUserCommunityPostController = async (
    req: Request,
    res: Response
  ) => {
    try {
      const userId = req.params.userId;


      const response = await getUserCommunityPost_useCase(
        dependencies
      ).executeFunction(userId);
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
      console.log("error in get user coommunity post conrtroller:", error);
      res
        .status(HttpStatus.NOT_FOUND)
        .json({ status: false, message: "error in finding posts" });
    }
  };
  return getUserCommunityPostController;
};
