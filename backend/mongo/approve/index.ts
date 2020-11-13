import { Iapprove } from "./interface";
import { Schema, model, SchemaTypes } from "mongoose";

const approveSchema: Schema = new Schema(
  {
    user: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
    type: Number,
    startTime: Date,
    endTime: Date,
    notice: String,
    files: [String],
    extra: Object,
    disabled: {
      type: Boolean,
      default: false,
    },
    approvers: [
      {
        user: {
          type: SchemaTypes.ObjectId,
          ref: "user",
        },
        isAgree: {
          type: Boolean,
          default: false,
        },
      },
    ],
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
