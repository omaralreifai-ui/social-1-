import { JwtPayload } from "jsonwebtoken";
import { IUser } from "../interface/interface";

declare module 'express-serve-static-core' {
    interface Request {
        user? : Partial<IUser> & JwtPayload
        }
    }
