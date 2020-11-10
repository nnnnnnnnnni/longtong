import { Document, Types } from "mongoose";
export import ObjectId = Types.ObjectId;

export interface IDocument extends Document {
  title: string;          // 标题
  author: ObjectId;       // 作者
  body: string;           // 正文
  visitors: ObjectId[];   // 浏览者
  createTime?: Date;      // 创建时间
  updateTime?: Date;      // 更新时间
}
