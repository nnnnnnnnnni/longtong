import { Document } from "mongoose";

export interface Icompany extends Document {
  name: String; //公司名字
  creater: String; // 创建者
  users: any[]; // 所有成员
  admins: any[]; // 所有管理员
  projects: any[]; // 下属项目
  introduction: String; // 简介
  createTime: Date; // 创建时间
  updateTime: Date; // 修改时间
}
