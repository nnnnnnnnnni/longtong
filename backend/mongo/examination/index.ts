import { Iexamination } from "./interface";
import { Schema, model, SchemaTypes } from "mongoose";

const examinationSchema = new Schema(
  {
    title: String,
    questions: {
      type: SchemaTypes.ObjectId,
      ref: 'question'
    },
    disabled: Boolean,
    users: {
      type: SchemaTypes.ObjectId,
      ref: 'user'
    }
  },
  {
    timestamps: {
      createdAt: "createTime",
      updatedAt: "updateTime",
    },
  }
);

export const examination = model<Iexamination>("examination", examinationSchema);
