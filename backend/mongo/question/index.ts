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
      enum: [0, 1, 2, 3],
      default: 0,
    },
    performances: [{
      type: SchemaTypes.ObjectId,
      ref: 'performance',
      default: []
    }],
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
