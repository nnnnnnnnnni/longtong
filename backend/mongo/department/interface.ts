import { Document, Types } from "mongoose";
import { Iuser } from "../user/interface";
export import ObjectId = Types.ObjectId;

export interface Idepartment extends Document {
  name: string;                       // 部门名字,
  admins?: (ObjectId | Iuser)[];      // 管理员
  members?: (ObjectId | Iuser)[];     // 成员
  upper?: ObjectId | Idepartment;    // 上级部门
  createTime: Date;                   // 创建时间
  updateTime: Date;                   // 更新时间
}
