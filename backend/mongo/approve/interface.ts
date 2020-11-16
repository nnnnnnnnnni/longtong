import { Document, Types } from "mongoose";
export import ObjectId = Types.ObjectId;

export interface Iapprove extends Document {
  user: ObjectId;           // 发起人
  type: string;             // 审批类型
  startTime?: Date;         // 开始时间
  endTime?: Date;           // 结束时间
  files?: [string];         // 备注文件
  extra: Object;            // 额外信息
  notice?: string;          // 备注
  status: string;           // 状态
  disabled?: Boolean;       // 已撤销
  approvers: [{             // 审批人
    user: ObjectId,
    isApprove: boolean
  }];
  cc: [ObjectId]            // 抄送人
}
