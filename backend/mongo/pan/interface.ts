import { Document, Types } from "mongoose";
export import ObjectId = Types.ObjectId;

export interface Ipan extends Document {
  name: string;           // 项目名字,
  user: ObjectId;         // 上传人
  size: number;           // 文件大小
  disabled: boolean;      // 是否禁用
  url: string;            // 文件地址
  createTime?: Date;      // 创建时间
}
