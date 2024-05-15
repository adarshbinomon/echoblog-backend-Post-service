export const getMonthlyPostCountUseCase = (dependencies: any) => {
  const {
    repository: { postRepository },
  } = dependencies;

  const executeFunction = async () => {
    try {
      const postsPerMonth = await postRepository.getMonthlyPostCount();

      if (postsPerMonth) {
        return postsPerMonth;
      }
    } catch (error) {
      console.log("error in getMonthlypostscopuntusecase", error);
      return {
        status: false,
        message: "error in getMonthlypostscopuntusecase",
      };
    }
  };
  return { executeFunction };
};
