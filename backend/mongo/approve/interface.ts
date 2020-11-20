import { Document, Types } from "mongoose";
export import ObjectId = Types.ObjectId;

export interface Iapprove extends Document {
  user: ObjectId;           // 发起人
  type: string;             // 审批类型
  files?: [string];         // 备注文件
  extra: Object;            // 额外信息
  notice?: string;          // 备注
  status: string;           // 状态
  disabled?: Boolean;       // 已撤销
  agree: Iagree             // 经手人
  approvers: [ObjectId];
  keys?: [ObjectId];
  cc: [ObjectId]            // 抄送人
}

export interface Iagree {
  approve: Iapp,
  key?: Iapp
}

export interface Iapp {
  user?: ObjectId,
  isAgree: boolean
}