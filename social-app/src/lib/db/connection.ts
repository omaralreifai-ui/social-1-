import { env } from "../config/env";
import mongoose from "mongoose";
 mongoose.connect(env.db.url);