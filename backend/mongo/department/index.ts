import { Idepartment } from "./interface";
import { Schema, model, SchemaTypes } from "mongoose";

const departmentSchema = new Schema(
  {
    name: {
      type: String,
      unique: true
    },
    company: {
      type: SchemaTypes.ObjectId,
      ref: "company",
    },
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
    upper: {
      type: SchemaTypes.ObjectId,
      ref: "department",
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

export const department = model<Idepartment>("department", departmentSchema);
