import { Document } from "mongoose";

export interface Iproject extends Document {
  name: String; // 项目名字,
  introduction: String; // 简介
  creater: String; // 创建者
  admins: any[]; // 管理员
  users: any[] // 成员
  company: String // 所属公司
  createTime: Date // 创建时间
  updateTime: Date // 修改时间
}
