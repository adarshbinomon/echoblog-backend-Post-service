import { Dependencies } from "../../../utils/interfaces/dependency.interface";

export const getPostsFromCommunityUsecase = (dependencies: any) => {
  const {
    repository: { postRepository },
  } = dependencies;

  const executeFunction = async (community: string[], offset: number) => {
    try {
      const response = await postRepository.getPostsFromCommunity(
        community,
        offset
      );

      if (response.status) {
        return response;
      } else {
        return {
          status: false,
          message: "Failed to fetch posts from community.",
        };
      }
    } catch (error) {
      console.log("Error in getPostsFromCommunityUsecase:", error);
      return {
        status: false,
        message: "Error occurred while fetching posts from community users.",
      };
    }
  };

  return { executeFunction };
};
