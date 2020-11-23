import { Iquestion } from "./interface";
import { Schema, model, SchemaTypes } from "mongoose";

const questionSchema = new Schema(
  {
    title: String,
    description: String,
    type: Number,
    belong: Number,
    score: Number,
    answer: String,
    text: [String]
  },
  {
    timestamps: {
      createdAt: "createTime",
      updatedAt: "updateTime",
    },
  }
);

export const question = model<Iquestion>("question", questionSchema);
