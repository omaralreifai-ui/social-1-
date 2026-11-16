import { User } from "../../lib/db/user.model"; 
import { Ipost, IUser } from "../../lib/interface/interface";
import { Types } from "mongoose";
import { AbstractRpository } from "../../lib/db/db.abstract";
import { post } from "./model/model";
class PostRepository extends AbstractRpository<Ipost> {

 constructor() {
    super(post) 
 }


}