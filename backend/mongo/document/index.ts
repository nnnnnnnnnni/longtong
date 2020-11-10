import { IDocument } from "./interface";
import { Schema, model, SchemaTypes } from "mongoose";

const documentSchema = new Schema(
  {
    title: String,
    author: {
      type: String,
      ref: "user",
    },
    body: String,
    visitors: [
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

export const document = model<IDocument>("document", documentSchema);
