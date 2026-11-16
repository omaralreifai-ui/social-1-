import { Router } from "express";
import userController, { UserController } from "./user.controller";

export const userRouter = Router();

userRouter.get('/getUser', userController.getUserByEmail);
userRouter.post('/getUser', userController.getUserByEmail);
userRouter.post('/followUser' ,userController.followUser);
userRouter.post('/UnfollowUser' ,userController.unfollow);
userRouter.post('/findUserByName' ,userController.findUserByName);
userRouter.patch('/Private/public' ,userController.updatePrivacyController) ;
