import { Document, Types } from "mongoose";
import { Iperformance } from "../performance/interface";
import { Iuser } from "../user/interface";
export import ObjectId = Types.ObjectId;

export interface IDscore extends Document {
  user: ObjectId | Iuser;               // 所属人
  performance: ObjectId | Iperformance  // 所属绩效
  score?: number                        // 答案得分
}

export interface Iscore {
  _id: ObjectId
  user: ObjectId | Iuser;               // 所属人
  performance: ObjectId | Iperformance  // 所属绩效
  score?: number                        // 答案得分
}
