import userRepository from "./user.repository";

import { AppError } from "../../lib/error/error";

export class userService {

    constructor() {}

    async getUserByEmail(email: string) {
        return userRepository.findByEmail(email);
    }


    async followUser(followerId:string, followingId:string) {

   

    const follower = await  userRepository.findById;
    const following = await userRepository.findUserById(followingId);

    if (!follower || !following) {
        throw new AppError('User not found', 404);
    }

    const existingFollow = await userRepository.findFollow(
        followerId,
        followingId
    );

    if (existingFollow) {
        throw new AppError('You already follow this user', 400);
    }

    return await userRepository.createFollow(
        followerId,
        followingId
    );
}

async unfollowUser(followerId:string, followingId:string) {

    const existingFollow = await userRepository.findFollow(
        followerId,
        followingId
        );
    if (!existingFollow) {
        throw new AppError('You are not following this user', 400);
        }

    return await userRepository.deleteFollow(
        followerId,
        followingId
        );
    }
async findUserByName(username:string){
const user =  await userRepository.findUserByName(username);
if(!user.length) {throw new AppError('user not found',400)
}
return user;
}

async updatePrivacyService(userId:string, isPrivate:boolean) {

    if (typeof isPrivate !== 'boolean') {
        throw new AppError('isPrivate must be a boolean', 400);
    }

    const user = await userRepository.updatePrivacy(userId, isPrivate);

    if (!user) {
        throw new AppError('User not found', 404);
    }

    return user;
}
}
export default new userService();