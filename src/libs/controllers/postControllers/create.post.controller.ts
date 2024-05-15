import { Request, Response } from "express";
import { PostData } from "../../../utils/interfaces/interface";
import { Dependencies } from "../../../utils/interfaces/dependency.interface";
import { HttpStatus } from "../../../utils/enums/http.statuscodes";

export default (dependencies: Dependencies) => {
  const {
    useCase: { createPost_UseCase },
  } = dependencies;

  const createPostController = async (req: Request, res: Response) => {
    try {
      const data = req.body;

      const response = await createPost_UseCase(dependencies).executeFunction(
        data
      );

      if (response.status) {
        res
          .status(HttpStatus.CREATED)
          .json({ status: true, message: "Post created successfully" });
      } else {
        res
          .status(400)
          .json({ status: false, message: "Post creation failed" });
      }
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ status: false, message: "Internal Server Error" });
    }
  };

  return createPostController;
};
