import { IMission } from "@/mongo/mission/interface";
import { Context } from "koa";
import dayjs from "dayjs";
import db from "../mongo/schema";

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
  if(doc.handler){
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
    isALLDay: doc.isALLDay,
    status: missionStatus,
    remark: doc.remark,
    comment: {
      user: ctx.user._id,
      action: "create",
      time: new Date(),
    },
    handler: handlers,
  });
  return {
    data: newMission,
  };
};

export const missions = async (ctx: Context): Promise<any> => {
  const userId = ctx.user._id;
  const missions: any[] = await db.mission
    .find({
      $or: [{ organizer: userId }, { "handler.user": userId }],
    })
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
