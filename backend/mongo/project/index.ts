import { Iproject } from "./interface";
import { Schema, model, SchemaTypes } from "mongoose";

const projectSchema = new Schema(
  {
    name: String,
    introduction: String,
    creater: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
    admins: [
      {
        type: SchemaTypes.ObjectId,
        ref: "user",
      },
    ],
    users: [
      {
        type: SchemaTypes.ObjectId,
        ref: "user",
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
