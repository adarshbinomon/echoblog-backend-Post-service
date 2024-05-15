import { Dependencies } from "../../../utils/interfaces/dependency.interface";
import { UserData } from "../../../utils/interfaces/interface";

export const updateUserUsecase = (dependencies: Dependencies) => {
  const {
    repository: { postRepository },
  } = dependencies;
  const executeFunction = async (data: UserData) => {
    const response = await postRepository.updateUser(data);

    if (response.status) {
      return { message: "user updated", status: true };
    } else {
      return { message: "update failed", status: false };
    }
  };

  return { executeFunction };
};
