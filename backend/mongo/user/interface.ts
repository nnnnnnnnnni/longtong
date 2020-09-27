import { Document, Types } from "mongoose";
export import ObjectId = Types.ObjectId;

export interface Iuser extends Document {
  name?: string; // 姓名
  userName?: string; // 昵称
  avator?: string; // 头像
  job?: string; // 担任职务
  department?: {
    // 部门
    info: ObjectId;
    role: string;
  };
  introduction?: string; // 简介
  mail: string; // 邮箱
  password: string; // 密码
  wechat?: string; // 绑定微信
  miniProgram?: string; // 绑定小程序
  phone?: string; // 手机
  company?: {
    // 所属公司
    info: ObjectId;
    role: string;
  };
  role?: any[]; // 用户角色
  createTime?: Date; // 创建时间
  updateTime?: Date; // 修改时间
  lastLoginTime?: Date; // 最后登录时间
  timeLine?: string; // 工作时长
  mfa?: string; // MFA绑定
}
