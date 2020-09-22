import { Iproject } from "./interface";
import { Schema, model, SchemaTypes } from "mongoose";

const projectSchema = new Schema(
  {
    name: String,
    logo: String,
    introduction: String,
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
    company: {
      type: SchemaTypes.ObjectId,
      ref: "company",
    },
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

export const project = model<Iproject>("project", projectSchema);
