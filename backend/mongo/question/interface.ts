import { Document, Types } from "mongoose";
import { Iperformance } from "../performance/interface";
export import ObjectId = Types.ObjectId;

export interface Iquestion extends Document {
  title: string;                              // 标题
  description: string;                        // 描述
  type: number;                               // 题目类型 1单选、2多选、3填空
  belong: number;                             // 所属 0未使用绩效题目、1已使用绩效题目、2未使用面试题目、3已使用面试题目
  performances: (Iperformance| ObjectId)[];   // 引用此条题目的绩效
  score: number;                              // 题目分值
  text?: string[];                            // 选项内容(绩效题目的时候不填，在绩效内填空即可)
  answer?: string;                            // 题目答案
}
