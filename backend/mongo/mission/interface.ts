import { Document, Types } from "mongoose";
export import ObjectId = Types.ObjectId;

export interface IMission extends Document {
  title: string;              // 标题
  organizer: ObjectId;        // 发起者
  isAllDay: Boolean;          // 是否全天
  startTime: Date;            // 开始时间
  endTime: Date;              // 截止时间
  priority: number;           // 优先级  1-4： 十分紧急|紧急|普通|较低
  type: string;               // 任务类型
  status: string;             // 任务状态
  handler?: Ihandler[];       // 处理人员
  project?: ObjectId;         // 所属项目
  remark?: string;            // 备注
  comment?: Icomment[];       // 评论信息
  createTime?: Date;          // 创建时间
  updateTime?: Date;          // 更新时间
}

export interface Ihandler {
  user: ObjectId;
  isFinish: boolean;
  isReject?: boolean;
}

export interface Icomment {
  user: ObjectId;
  action: string;
  time: Date;
  msg?: string
}