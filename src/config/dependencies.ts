import { postRepository } from "../libs/app/repository";
import {
  createPost_UseCase,
  findUserPosts_useCase,
  getPost_useCase,
  editPost_useCase,
  deletePost_useCase,
  getAllPosts_useCase,
  likePost_useCase,
  addComment_Usecase,
  updataPostStatus_useCase,
  getAllPostsAdmin_useCase,
  getUserCommunityPost_useCase,
  getCommunityPosts_useCase,
  replyToComment_useCase,
  editCommentUseCase,
  likeCommentUseCase,
  deleteCommentUseCase,
  searchPostUseCase,
  reportPostUseCase,
  getSavedPostsUseCase,
  getPostsFromFollowingUsecase,
  getMonthlyPostCountUseCase,
  getPostsFromCommunityUsecase,
} from "../libs/usecases";
import {
  createUserUsecase,
  updateUserUsecase,
} from "../libs/usecases/consumerUseCases";
import {
  ConsumeUsecase,
  Repository,
  UseCase,
} from "../utils/interfaces/dependency.interface";

const useCase: UseCase = {
  createPost_UseCase,
  findUserPosts_useCase,
  getPost_useCase,
  editPost_useCase,
  deletePost_useCase,
  getAllPosts_useCase,
  likePost_useCase,
  addComment_Usecase,
  updataPostStatus_useCase,
  getAllPostsAdmin_useCase,
  getUserCommunityPost_useCase,
  getCommunityPosts_useCase,
  replyToComment_useCase,
  editCommentUseCase,
  likeCommentUseCase,
  deleteCommentUseCase,
  searchPostUseCase,
  reportPostUseCase,
  getSavedPostsUseCase,
  getPostsFromFollowingUsecase,
  getMonthlyPostCountUseCase,
  getPostsFromCommunityUsecase,
};

const repository: Repository = {
  postRepository,
};

const consumeUsecase: ConsumeUsecase = {
  createUserUsecase,
  updateUserUsecase,
};

export default {
  repository,
  useCase,
  consumeUsecase,
};
