import { Ipan } from "./interface";
import { Schema, model, SchemaTypes } from "mongoose";

const panSchema = new Schema(
  {
    name: String,
    user: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    url: String,
    size: Number,
  },
  {
    timestamps: {
      createdAt: "createTime",
    },
  }
);

export const pan = model<Ipan>("pan", panSchema);
