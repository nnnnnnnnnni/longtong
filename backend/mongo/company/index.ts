import { Icompany } from "./interface";
import { Schema, model, SchemaTypes } from "mongoose";
import { user } from "../user";

const companySchema: Schema = new Schema(
  {
    name: String,
    Participants: [
      {
        role: {
          type: String,
          enum: [
            "creater", //创建者
            "admin", // 管理员
            "user", // 成员
          ],
          ref: "user",
          default: "user",
        },
        user: {
          type: SchemaTypes.ObjectId,
          ref: "user",
        },
      },
    ],
    projects: [
      {
        type: SchemaTypes.ObjectId,
        ref: "project",
      },
    ],
    introduction: String,
    createTime: {
      type: Date,
      default: Date.now(),
    },
    updateTime: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: {
      createdAt: "createTime",
      updatedAt: "updateTime",
    },
  }
);

export const company = model<Icompany>("company", companySchema);
