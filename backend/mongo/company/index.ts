import { Icompany } from "./interface";
import { Schema, model, SchemaTypes } from "mongoose";

const companySchema: Schema = new Schema(
  {
    name: String,
    creater: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
    users: [
      {
        type: SchemaTypes.ObjectId,
        ref: "user",
      },
    ],
    admins: [
      {
        type: SchemaTypes.ObjectId,
        ref: "user",
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
