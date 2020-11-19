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
  agree: {                  // 经手人
    approve: {
      user?: ObjectId,
      isAgree: boolean
    },
    key?: {
      user?: ObjectId,
      isAgree: boolean
    },
  };
  approvers: [ObjectId];
  keys?: [ObjectId];
  cc: [ObjectId]            // 抄送人
}
