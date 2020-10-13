import { IMission } from "@/mongo/mission/interface";
import { Context } from "koa";
import dayjs, { Dayjs } from "dayjs";
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
  const newMission: IMission = await db.mission.create({
    title: doc.title,
    startTime: doc.time[0],
    endTime: doc.time[1],
    priority: doc.priority,
    type: doc.type,
    organizer: ctx.user._id,
    isALLDay: doc.isALLDay,
    status: missionStatus,
    remarks: doc.remark
  })
  return {
    data: newMission
  }
};
