import { Document, Types } from "mongoose";
export import ObjectId = Types.ObjectId;

export interface Iproject extends Document {
  name: string; // 项目名字,
  logo: string; // 项目logo
  introduction: string; // 简介
  admins?: ObjectId[];  //管理员
  members?: ObjectId[]; // 成员
  department: ObjectId; // 所属部门
  company: ObjectId; // 所属公司
  createTime: Date; // 创建时间
  updateTime: Date; // 修改时间
}
