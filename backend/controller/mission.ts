import { IMission } from "@/mongo/mission/interface";
import { Context } from "koa";
import dayjs from "dayjs";
import db from "../mongo/schema";

// 创建任务
export const create = async (ctx: Context) => {
  const doc = ctx.request.body;
  let missionStatus: string = "";
  if (!doc.handler || doc.handler.length == 0) {
    missionStatus = "needAssign";
  } else if (dayjs(new Date()) <= dayjs(doc.time[0])) {
    missionStatus = "upcoming";
  } else if (dayjs(new Date()) <= dayjs(doc.time[1])) {
    missionStatus = "processing";
  } else if (dayjs(new Date()) > dayjs(doc.time[1])) {
    missionStatus = "overdue";
  }
  let handlers: any[] = [];
  if (doc.handler) {
    handlers = doc.handler.map((user: string) => {
      return {
        user: user,
        isFinish: false,
      };
    });
  }
  const newMission: IMission = await db.mission.create({
    title: doc.title,
    startTime: doc.time[0],
    endTime: doc.time[1],
    priority: doc.priority,
    type: doc.type,
    organizer: ctx.user._id,
    isAllDay: doc.isAllDay,
    status: missionStatus,
    remark: doc.remark,
    comment: [
      {
        user: ctx.user._id,
        action: "create",
        time: new Date(),
      },
    ],
    handler: handlers,
  });
  return {
    data: newMission,
  };
};

// 创建
export const missions = async (ctx: Context): Promise<any> => {
  const userId = ctx.user._id;
  const missions: any[] = await db.mission
    .find({
      $or: [{ organizer: userId }, { "handler.user": userId }],
    })
    .populate("handler.user")
    .lean()
    .exec();
  let _missions: any[] = [];
  missions.forEach((mission: IMission) => {
    const _mission = {
      isOwn: mission.organizer == userId,
      ...mission,
    };
    _missions.push(_mission);
  });
  return {
    data: _missions,
  };
};

// 通过id 获取某一任务
export const missionById = async (ctx: Context): Promise<any> => {
  const userId = ctx.user._id;
  const missionId = ctx.request.query._id;
  const mission: any = await db.mission
    .findOne({
      _id: missionId,
    })
    .populate("organizer")
    .populate("handler.user")
    .populate("comment.user")
    .lean()
    .exec();
  return {
    data: {
      ...mission,
      isOwn: mission.organizer._id == userId,
    },
  };
};

// 更新单个任务
export const update = async (ctx: Context): Promise<any> => {
  const doc = ctx.request.body;
  const missionId = doc._id;
  delete doc._id;
  const oldMission: IMission = await db.mission.findOne({ _id: missionId });
  if (doc.createTime) delete doc.createTime;
  if (doc.updateTime) delete doc.updateTime;
  if (doc.organizer) delete doc.organizer;
  if (doc.comment) delete doc.comment;
  const newHandlersObj: any = {};
  oldMission.handler.forEach((user: any) => {
    newHandlersObj[user.user] = user.isFinish;
  })
  doc.handler.forEach((user: string) => {
    if(!newHandlersObj.hasOwnProperty(user)) {
      newHandlersObj[user] = false;
    }
  })
  let newHandlersArr: any = []
  Object.keys(newHandlersObj).forEach((key: string) => {
    newHandlersArr.push({
      user: key,
      isFinish: newHandlersObj[key]
    })
  })
  doc.handler = newHandlersArr
  const newMission: IMission = await db.mission.updateOne(
    {
      _id: missionId,
    },
    {
      $push: { comment: { user: ctx.user._id, action: "update", time: new Date() } },
      $set: doc,
    },
    {
      new: true,
    }
  );
  return {
    data: newMission,
  };
};
