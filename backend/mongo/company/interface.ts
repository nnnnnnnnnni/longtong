import { Document } from "mongoose";

export interface Icompany extends Document {
  name: string; //公司名字
  logo: string; // 公司logo
  admins?: string[];  //管理员
  members?: string[]; // 成员
  projects?: string[]; // 下属项目
  introduction: string; // 简介
  createTime?: Date; // 创建时间
  updateTime?: Date; // 修改时间
}
