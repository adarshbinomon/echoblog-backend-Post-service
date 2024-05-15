import { Request, Response } from "express";
import { Dependencies } from "../../../utils/interfaces/dependency.interface";
import { HttpStatus } from "../../../utils/enums/http.statuscodes";

export default (dependencies: Dependencies) => {
  const {
    useCase: { likePost_useCase },
  } = dependencies;

  const likePostController = async (req: Request, res: Response) => {
    try {
      const postId = req.params.postId;
      const { userId, liked } = req.body;

      const response = await likePost_useCase(dependencies).executeFunction(
        postId,
        userId,
        liked
      );
      if (response.status) {
        res.status(HttpStatus.OK).json({
          status: true,
          message: "like successfull",
          likes: response?.likes,
        });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          status: false,
          message: "like unsuccessfull",
          likes: response?.likes,
        });
      }
    } catch (error) {
      console.log("error in like post controller: ", error);

      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ status: false, message: "like unsuccessfull" });
    }
  };
  return likePostController;
};
