import { IDanswer } from "./interface";
import { Schema, model, SchemaTypes } from "mongoose";

const answerSchema: Schema = new Schema(
  {
    user: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
    performance: {
      type: SchemaTypes.ObjectId,
      ref: "performance",
    },
    question: {
      type: SchemaTypes.ObjectId,
      ref: "question",
    },
    colleague: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
    score: Number,
    answer: String,
  },
  {
    timestamps: {
      createdAt: "createTime",
      updatedAt: "updateTime",
    },
  }
);

answerSchema.index({user: 1, performance: 1, question: 1, colleague: 1})

export const answer = model<IDanswer>("answer", answerSchema);
