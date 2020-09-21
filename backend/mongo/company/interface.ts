import { Document } from "mongoose";

export interface Icompany extends Document {
  name: String; //公司名字
  Participants: {
    // 所有成员
    type: String;
    user: String;
  };
  projects: any[]; // 下属项目
  introduction: String; // 简介
  createTime: Date; // 创建时间
  updateTime: Date; // 修改时间
}
