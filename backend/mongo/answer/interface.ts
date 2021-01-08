import { Document, Types } from "mongoose";
import { Iperformance } from "../performance/interface";
import { Iquestion } from "../question/interface";
import { Iuser } from "../user/interface";
export import ObjectId = Types.ObjectId;

export interface IDanswer extends Document {
  user: ObjectId | Iuser;               // 作答人
  performance: ObjectId | Iperformance  // 所属绩效
  question: ObjectId | Iquestion        // 题目
  score?: number                        // 答案得分
  answer: string                        // 作答答案
}

export interface Ianswer {
  _id: ObjectId
  user: ObjectId | Iuser;               // 作答人
  performance: ObjectId | Iperformance  // 所属绩效
  question: ObjectId | Iquestion        // 题目
  score?: number                        // 答案得分
  answer: string                        // 作答答案
}