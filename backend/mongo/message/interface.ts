import { Document, Types } from "mongoose";
export import ObjectId = Types.ObjectId;

export interface Imessage extends Document {
  msg: string; //消息主体
  accepter: ObjectId[]; // 消息接收群体
  createTime: Date; // 发布时间
}
