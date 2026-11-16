import { Types } from "mongoose";

export interface IUser {
    _id?: Types.ObjectId;
    userName: string;
    email: string;
    password?: string;
    phoneNumber?: string;
    gender?: string;
    provider?: string;
    isVerified?: boolean;
    twoStepVerification?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    resetPasswordToken:String;
    resetPasswordExpires: Date;
    isPrivate : boolean ;

}


export interface Ipost {
    content: string;
    UserId: Types.ObjectId;
    commentsCount: number;
    reactionsCount: number;
    allowsComments: boolean;
}
