import { Dependencies } from "../../../utils/interfaces/dependency.interface";

export const getCommunityPosts_useCase = (dependencies: Dependencies) => {
  const {
    repository: { postRepository },
  } = dependencies;

  const executeFunction = async (communityId: string) => {
    try {
      const response = await postRepository.findCommunityPosts(communityId);
      console.log(communityId);
      
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
      console.log("error in get communituy posts usecase: ", error);
      return { status: false, message: "error in findin post" };
    }
  };
  return { executeFunction };
};
