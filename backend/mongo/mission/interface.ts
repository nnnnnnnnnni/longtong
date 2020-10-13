import { Document, Types } from "mongoose";
export import ObjectId = Types.ObjectId;

export interface IMission extends Document {
  title: string; //标题
  organizer: ObjectId; // 发起者
  isALLDay: Boolean; // 是否全天
  startTime: Date; // 开始时间
  endTime: Date; // 截止时间
  priority: number; // 优先级  1-4： 十分紧急|紧急|普通|较低
  type: string; // 任务类型
  status: string; // 任务状态
  handler?: [
    // 处理人员
    {
      user: ObjectId;
      isFinish: boolean;
    }
  ];
  project?: ObjectId; // 所属项目
  remarks?: string; //备注
  comment?: {
    // 评论信息
    user: ObjectId;
    action: string;
    time: Date;
    msg: String;
  }; //评论
  createTime?: Date; // 创建时间
  updateTime?: Date; // 更新时间
}
