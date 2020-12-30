import { Document, Types } from "mongoose";
import { Idepartment } from "../department/interface";
import { Iquestion } from "../question/interface";
export import ObjectId = Types.ObjectId;

export interface IDperformance extends Document {
  title: string;                          // 绩效名字,
  startTime: Date;                        // 绩效开始时间
  endTime: Date;                          // 绩效结束时间
  departments: (Idepartment| ObjectId)[]; // 参与部门
  questions: (Iquestion| ObjectId)[];     // 所有问题
  text: string[];                         // 选项内容
  ratio: number[];                        // 选项占比
}

export interface Iperformance {
  _id: ObjectId
  title: string;                          // 绩效名字,
  startTime: Date;                        // 绩效开始时间
  endTime: Date;                          // 绩效结束时间
  departments: (Idepartment| ObjectId)[]; // 参与部门
  questions: (Iquestion| ObjectId)[];     // 所有问题
  text: string[];                         // 选项内容
  ratio: number[];                        // 选项占比
}