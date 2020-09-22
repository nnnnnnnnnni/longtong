import { Document } from "mongoose";

export interface Iproject extends Document {
  name: String; // 项目名字,
  logo: String; // 项目logo
  introduction: String; // 简介
  Participants: [
    {
      // 所有成员
      type: String;
      user: String;
    }
  ];
  company: String; // 所属公司
  createTime: Date; // 创建时间
  updateTime: Date; // 修改时间
}
