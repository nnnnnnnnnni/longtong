import { IMission } from "@/mongo/mission/interface";
import { Context } from "koa";
import { getMissionStatus } from "../lib/utils";
import db from "../mongo/schema";

// 获取“与我相关”
export const infos = async (ctx: Context): Promise<any> => {
  const userId = ctx.user._id;
  const missions: IMission[] = await db.mission.find({
    $or: [{ organizer: userId }, {handler: {$eq: userId}}],
    
  }).limit(5)
};
