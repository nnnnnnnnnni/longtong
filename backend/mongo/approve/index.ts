import { Iapprove } from "./interface";
import { Schema, model, SchemaTypes } from "mongoose";

const approveSchema: Schema = new Schema(
  {
    user: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
    type: {
      type: String,
      enum: ["qingjia", "jiaban", "caigou", "waichu", "zhaopin", "zhuanzheng"],
    },
    notice: String,
    files: [String],
    extra: Object,
    disabled: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["posted", "processing", "passed", "rejected"],
      default: "posted",
    },
    agree: {
      approve: {
        user: {
          type: SchemaTypes.ObjectId,
          ref: "user",
        },
        isAgree: {
          type: Boolean,
        }
      },
      key: {
        user: {
          type: SchemaTypes.ObjectId,
          ref: "user",
        },
        isAgree: {
          type: Boolean,
        }
      },
    },
    approvers: [{
      type: SchemaTypes.ObjectId,
      ref: "user",
    }],
    keys: [{
      type: SchemaTypes.ObjectId,
      ref: "user",
    }],
    cc: [
      {
        type: SchemaTypes.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    timestamps: {
      createdAt: "createTime",
      updatedAt: "updateTime",
    },
  }
);

export const approve = model<Iapprove>("approve", approveSchema);
