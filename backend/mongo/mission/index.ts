import { IMission } from "./interface";
import { Schema, model, SchemaTypes } from "mongoose";

const missionSchema = new Schema(
  {
    title: String,
    organizer: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
    isAllDay: {
      type: Boolean,
      default: false,
    },
    startTime: {
      type: Date,
      default: Date.now(),
    },
    endTime: {
      type: Date,
      default: Date.now(),
    },
    priority: {
      type: Number,
      default: 5,
    },
    type: {
      type: String,
      enum: ["bug", "demand", "mission"],
    },
    status: {
      type: String,
      enum: ["needAssign", "upcoming", "processing", 'overdue', 'passed', 'closed'],
    },
    handler: [{
      user: {
        type: SchemaTypes.ObjectId,
        ref: 'user'
      },
      isFinish: {
        type: Boolean,
        default: false
      }
    }],
    project: {
      type: SchemaTypes.ObjectId,
      ref: 'project'
    },
    remark: String,
    comment: [{
      user: {
        type: SchemaTypes.ObjectId,
        ref: 'user'
      },
      action: {
        type: String,
      },
      time: {
        type: Date,
        default: Date.now()
      },
    }],
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

export const mission = model<IMission>("mission", missionSchema);
