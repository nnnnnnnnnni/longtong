import { Iperformance } from "./interface";
import { Schema, model, SchemaTypes } from "mongoose";

const performanceSchema = new Schema(
  {
    title: String,
    startTime: Date,
    endTime: Date,
    departments: [{
      type: SchemaTypes.ObjectId,
      ref: 'department'
    }],
    questions: [{
      type: SchemaTypes.ObjectId,
      ref: 'question'
    }],
    ratio: [Number],
    text: [String]
  },
  {
    timestamps: {
      createdAt: "createTime",
      updatedAt: "updateTime",
    },
  }
);

export const performance = model<Iperformance>("performance", performanceSchema);
