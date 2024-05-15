import { Request, Response } from "express";
import { HttpStatus } from "../../../utils/enums/http.statuscodes";
export default (dependencies: any) => {
  const {
    useCase: { getPostsFromCommunityUsecase },
  } = dependencies;

  const getPostsFromCommunityController = async (
    req: Request,
    res: Response
  ) => {
    try {
        const { offset } = req.query;
        const { community } = req.body;
      const response = await getPostsFromCommunityUsecase(
        dependencies
      ).executeFunction(community,offset);
console.log('response',response);

      if (response.status) {
        res.status(HttpStatus.OK).json(response);
      } else {
        res.status(HttpStatus.NOT_FOUND).json(response);
      }
    } catch (error) {
      return {
        status: false,
        message: "error in get posts from community controller",
      };
    }
  };
  return getPostsFromCommunityController;
};
