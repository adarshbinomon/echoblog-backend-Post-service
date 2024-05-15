import { Dependencies } from "../../../utils/interfaces/dependency.interface";

export const getPost_useCase = (dependencies: Dependencies) => {
  const {
    repository: { postRepository },
  } = dependencies;

  const executeFunction = async (id: string) => {
    try {
      const response = await postRepository?.getPost(id);
      const user = await postRepository?.findUser(response.post.createdBy);

      if (response.status) {
        return {
          status: true,
          message: response.message,
          post: response.post,
          user: user.user,
        };
      } else {
        return { status: false, message: response.message };
      }
    } catch (error) {
      console.log("error", error);

      return { status: false, message: "error in find user post use case" };
    }
  };

  return { executeFunction };
};
