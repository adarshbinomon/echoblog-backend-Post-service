import { Request, Response } from "express";
import { UserData } from "../../../utils/interfaces/interface";
import { Dependencies } from "../../../utils/interfaces/dependency.interface";

export const createUserController = async (
  dependencies: Dependencies,
  data: UserData
) => {
  const {
    consumeUsecase: { createUserUsecase },
  } = dependencies;
  const response = await createUserUsecase(dependencies).executeFunction(data);
  
};
