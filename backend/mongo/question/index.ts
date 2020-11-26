import { Iquestion } from "./interface";
import { Schema, model, SchemaTypes } from "mongoose";

const questionSchema = new Schema(
  {
    title: String,
    description: String,
    type: {
      type: Number,
      enum: [1, 2, 3],
    },
    belong: {
      type: Number,
      enum: [1, 2, 0, 3],
      default: 0,
    },
    score: Number,
    answer: String,
    text: [String],
  },
  {
    timestamps: {
      createdAt: "createTime",
      updatedAt: "updateTime",
    },
  }
);

export const question = model<Iquestion>("question", questionSchema);
