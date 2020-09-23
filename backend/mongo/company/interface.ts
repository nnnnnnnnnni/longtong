import { Document } from "mongoose";

export interface Icompany extends Document {
  name: String; //公司名字
  logo: String; // 公司logo
  Participants?: [
    {
      // 所有成员
      role: String;
      user: String;
    }
  ];
  projects?: any[]; // 下属项目
  introduction: String; // 简介
  createTime?: Date; // 创建时间
  updateTime?: Date; // 修改时间
}
