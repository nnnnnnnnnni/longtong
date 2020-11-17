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
  agrees?: [ObjectId];      // 经手人
  approvers: [{             // 审批人
    user: ObjectId,
    isApprove: boolean
  }];
  keys?: [{                 // 决定者
    user: ObjectId,
    isApprove: boolean
  }];
  cc: [ObjectId]            // 抄送人
}
