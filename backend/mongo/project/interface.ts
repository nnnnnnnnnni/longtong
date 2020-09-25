import { Document } from "mongoose";

export interface Iproject extends Document {
  name: string; // 项目名字,
  logo: string; // 项目logo
  introduction: string; // 简介
  admins?: string[];  //管理员
  members?: string[]; // 成员
  company: string; // 所属公司
  createTime: Date; // 创建时间
  updateTime: Date; // 修改时间
}
