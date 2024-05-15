import { Dependencies } from "../../../utils/interfaces/dependency.interface";

export const getSavedPostsUseCase = (dependencies: Dependencies) => {
  const {
    repository: { postRepository },
  } = dependencies;

  const executeFunction = async (savedPosts: [string]) => {
    try {
      const response = await postRepository.getSavedPosts(savedPosts);

      if (response.status) {
        return {
          status: true,
          message: response.message,
          posts: response.posts,
        };
      } else {
        return { status: false, message: response.message };
      }
    } catch (error) {
      console.log("error in get saved post usecase", error);
      return { status: false, message: "error in getting posts" };
    }
  };
  return { executeFunction };
};
