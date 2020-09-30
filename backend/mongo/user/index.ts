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
      info: {
        type: SchemaTypes.ObjectId,
        ref: "department",
      },
      role: {
        type: String,
        enum: ["admin", "user"],
      },
    },
    introduction: String,
    mail: {
      type: String,
      unique: true,
    },
    password: String,
    wechat: {
      type: String,
    },
    miniProgram: {
      type: String,
    },
    phone: {
      type: String,
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
    project: [
      {
        info: {
          type: SchemaTypes.ObjectId,
          ref: "project",
        },
        role: {
          type: String,
          enum: ["admin", "user"],
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
