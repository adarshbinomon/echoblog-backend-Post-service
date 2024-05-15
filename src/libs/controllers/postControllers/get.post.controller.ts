import { Request, Response } from "express";
import { Dependencies } from "../../../utils/interfaces/dependency.interface";
import { HttpStatus } from "../../../utils/enums/http.statuscodes";

export default (dependencies: Dependencies) => {
  const {
    useCase: { getPost_useCase },
  } = dependencies;

  const getPostController = async (req: Request, res: Response) => {
    const id = req.params.id;

    const response = await getPost_useCase(dependencies).executeFunction(id);

    if (response.status) {
      res
        .status(HttpStatus.OK)
        .json({ status: true, post: response.post, user: response.user });
    } else {
      res.status(HttpStatus.NOT_FOUND).json({ status: false, message: "error finding post" });
    }
  };
  return getPostController;
};
