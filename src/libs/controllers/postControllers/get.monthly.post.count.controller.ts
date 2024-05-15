import { Dependencies } from "../../../utils/interfaces/dependency.interface";
import { Request, Response } from "express";
import { HttpStatus } from "../../../utils/enums/http.statuscodes";

export default (dependencies: Dependencies) => {
  const {
    useCase: { getMonthlyPostCountUseCase },
  } = dependencies;

  const getMonthlyPostCountController = async (req: Request, res: Response) => {
    try {
      const monthlyPostCount = await getMonthlyPostCountUseCase(
        dependencies
      ).executeFunction();

      if (monthlyPostCount) {
        res.status(HttpStatus.OK).json(monthlyPostCount);
      }
    } catch (error) {
      console.log("error in get getMonthlyPostCountController ", error);
      res
        .status(HttpStatus.NOT_FOUND)
        .json({ status: false, message: "error in finding posts" });
    }
  };
  return getMonthlyPostCountController;
};
