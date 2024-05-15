import { Dependencies } from "../../../utils/interfaces/dependency.interface";

export const getPostsFromFollowingUsecase = (dependencies: any) => {
  const {
    repository: { postRepository },
  } = dependencies;

  const executeFunction = async (following: string[], offset: number) => {
    try {
      const response = await postRepository.getPostsFromFollowing(
        following,
        offset
      );

      if (response.status) {
        return response;
      } else {
        return {
          status: false,
          message: "Failed to fetch posts from following users.",
        };
      }
    } catch (error) {
      console.log("Error in getPostsFromFollowingUsecase:", error);
      return {
        status: false,
        message: "Error occurred while fetching posts from following users.",
      };
    }
  };

  return { executeFunction };
};
