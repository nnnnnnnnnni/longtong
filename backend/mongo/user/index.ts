import { Iuser } from "./interface";
import { Schema, model, SchemaTypes } from "mongoose";

const userSchema: Schema = new Schema(
  {
    name: {
      type: String,
      index: true,
    }, // 姓名
    userName: {
      type: String,
    }, // 昵称
    avator: String, // 头像
    job: String, // 担任职务
    department: {
      type: SchemaTypes.ObjectId,
      ref: "department",
    }, // 部门
    introduction: String, // 简介
    mail: {
      type: String,
      unique: true,
    }, // 邮箱
    password: String, // 密码
    wechat: {
      type: String,
      unique: true,
    }, // 绑定微信
    miniProgram: String, // 绑定小程序
    phone: {
      type: String,
      unique: true,
    }, // 手机
    createTime: {
      type: Date,
      default: Date.now(),
    }, // 创建时间
    lastLoginTime: Date, // 最后登录时间
    timeLine: String, // 工作时长
    mfa: {
      type: String,
      unique: true,
    }, // MFA绑定
  },
  {
    timestamps: {
      createdAt: "createTime",
    },
  }
);

export const user = model<Iuser>("user", userSchema);
