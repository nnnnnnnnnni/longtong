import { Icompany } from "./interface";
import { Schema, model, SchemaTypes } from "mongoose";

const companySchema: Schema = new Schema(
  {
    name: String,
    logo: String,
    admins: [
      {
        type: SchemaTypes.ObjectId,
        ref: "user",
      },
    ],
    members: [
      {
        type: SchemaTypes.ObjectId,
        ref: "user",
      },
    ],
    projects: [
      {
        type: SchemaTypes.ObjectId,
        ref: "project",
      },
    ],
    approve: Object,
    performance: Object,
    introduction: String,
    createTime: {
      type: Date,
      default: Date.now(),
    },
    updateTime: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: {
      createdAt: "createTime",
      updatedAt: "updateTime",
    },
  }
);

export const company = model<Icompany>("company", companySchema);
