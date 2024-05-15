import { Dependencies } from '../utils/interfaces/dependency.interface';
import userPostRouter from './post/user.post.router'
import express from "express";

export const routes = (dependencies: Dependencies) => {
  const routes = express.Router();

  routes.use("/post", userPostRouter(dependencies));
  return routes;
};
