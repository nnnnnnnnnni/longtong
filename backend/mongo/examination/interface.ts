import { Document, Types } from "mongoose";
import { Iquestion } from "../question/interface";
import { Iuser } from "../user/interface";
export import ObjectId = Types.ObjectId;

export interface Iexamination extends Document {
  title: string;                          // 试题标题
  questions: (Iquestion| ObjectId)[];     // 试题题目
  disabled: boolean;                      // 是否可用
  users: (Iuser| ObjectId)[];             // 参与人员
}
