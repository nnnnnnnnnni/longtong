import { IDscore } from "./interface";
import { Schema, model, SchemaTypes } from "mongoose";

const scoreSchema: Schema = new Schema(
  {
    user: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
    performance: {
      type: SchemaTypes.ObjectId,
      ref: "performance",
    },
    marks: [
      {
        user: {
          type: SchemaTypes.ObjectId,
          ref: "user",
        },
        score: Number,
        createAt: {
          type: Date,
          default: Date.now
        }
      },
    ],
    score: Number,
  },
  {
    timestamps: {
      createdAt: "createTime",
      updatedAt: "updateTime",
    },
  }
);

export const score = model<IDscore>("score", scoreSchema);
