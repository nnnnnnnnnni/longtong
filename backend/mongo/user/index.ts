import { Iuser } from "./interface";
import { Schema, model, SchemaTypes } from "mongoose";

const userSchema: Schema = new Schema(
  {
    name: {
      type: String,
      index: true,
    },
    userName: {
      type: String,
    },
    avator: {
      type: String,
      default: "/default",
    },
    job: String,
    department: {
      type: SchemaTypes.ObjectId,
      ref: "department",
    },
    introduction: String,
    mail: {
      type: String,
      unique: true,
    },
    password: String,
    wechat: {
      type: String,
      unique: true,
    },
    miniProgram: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
      unique: true,
    },
    company: {
      info: {
        type: SchemaTypes.ObjectId,
        ref: "company",
      },
      role: {
        type: String,
        enum: ["creater", "admin", "user"],
      },
    },
    role: [
      {
        project: {
          type: SchemaTypes.ObjectId,
          ref: "project",
          unique: true,
        },
        role: {
          type: String,
          enum: ["creater", "admin", "user"],
        },
      },
    ],
    createTime: {
      type: Date,
      default: Date.now(),
    },
    updateTime: {
      type: Date,
      default: Date.now(),
    },
    lastLoginTime: Date,
    timeLine: String,
    mfa: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: {
      createdAt: "createTime",
      updatedAt: "updateTime",
    },
  }
);

export const user = model<Iuser>("user", userSchema);
