import { Document } from "mongoose";

export interface Idepartment extends Document {
  name: string; // 部门名字,
  company: string; //所属公司
  admins?: string[];  //管理员
  members?: string[]; // 成员
  upper?: string  // 上级部门
  createTime: Date; // 创建时间
  updateTime: Date; // 更新时间
}
