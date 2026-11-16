import { Request, Response, NextFunction } from "express";
import userService from "./user.service";
import { userNotExist } from "./error";

export class UserController {
    constructor() {}

    async getUserByEmail(req: Request, res: Response, next: NextFunction) {
        try {
            const {email} = (req.body) 
            
            const user = await userService.getUserByEmail(email);
            if (!user) {
                throw userNotExist;
            }

            return res.status(200).json({
                message: "user retrieved successfully",
                success: true,
                data: user
            });
        } catch (error) {
            next(error);
        }
    }
    async followUser(req :Request , res :Response, next :NextFunction) {
       try {
const {follower ,following} =req.body ;
const follow =await userService.followUser( follower ,following)
  return res.status(200).json({
                message: "follow create done",
                success: true,
                data: follow
            });
       } catch(error) {
        next(error)
       }
    }
    async unfollow (req :Request , res:Response , next:NextFunction) {
        try{
        const {followerId ,followingId}= req.body ;
        const follow = await userService.unfollowUser(followerId ,followingId) ;
          return res.status(200).json({
                message: "un follow done",
                success: true,
                data: follow 
            });
        } catch(error) {
            next(error)
        }

    }
    async findUserByName(req :Request , res:Response , next:NextFunction) {
        try{
        const{userName} = req.body;
        const user = await userService.findUserByName(userName);
          return res.status(200).json({
                message: "user found",
                success: true,
                data: user
            });
        } catch(error) {
            next(error)
        }
    }
      async updatePrivacyController(req: Request, res: Response, next: NextFunction) {
    try {

        const { userId, isPrivate } = req.body;
        
        const user = await userService.updatePrivacyService(
            userId,
            isPrivate
        );

        return res.status(200).json({
            message: 'Privacy settings updated successfully',
            data: user
        });

    } catch (error) {
        next(error);
        }
    }
}

export default new UserController();
