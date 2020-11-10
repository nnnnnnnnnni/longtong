import { Document, Types } from "mongoose";
export import ObjectId = Types.ObjectId;

export interface Icompany extends Document {
  name: string;           // 公司名字
  logo: string;           // 公司logo
  admins?: ObjectId[];    // 管理员
  members?: ObjectId[];   // 成员
  projects?: ObjectId[];  // 下属项目
  introduction: string;   // 简介
  createTime?: Date;      // 创建时间
  updateTime?: Date;      // 修改时间
}
