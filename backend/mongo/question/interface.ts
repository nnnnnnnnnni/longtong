import { Document, Types } from "mongoose";
export import ObjectId = Types.ObjectId;

export interface Iquestion extends Document {
  title: string;           // 标题
  description: string;     // 描述
  type: number;            // 题目类型 1单选、2多选、3填空
  belong: number;          // 所属 1绩效题目、2面试题目
  bind: ObjectId;          // 绑定的绩效套题、面试套题
  score: number;           // 题目分值
  
}
