import { Iproject } from "./interface";
import { Schema, model, SchemaTypes } from "mongoose";

const projectSchema = new Schema(
  {
    name: String,
    logo: String,
    introduction: String,
    admins: [
      {
        type: SchemaTypes.ObjectId,
        ref: "user",
      },
    ],
    members: [
      {
        type: SchemaTypes.ObjectId,
        ref: "user",
      },
    ],
    department: {
      type: SchemaTypes.ObjectId,
      ref: "department",
    },
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
