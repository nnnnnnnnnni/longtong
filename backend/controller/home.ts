import { IMission, ObjectId } from "@/mongo/mission/interface";
import { Context } from "koa";
import { getMissionStatus } from "../lib/utils";
import db from "../mongo/schema";

// 获取“与我相关”
export const infos = async (ctx: Context): Promise<any> => {
  const companyId = ctx.user.company.info._id;
  const userId = ctx.user._id;
  const TypeCount: any[] = await db.mission.aggregate([
    { $match: { company: ObjectId(companyId) } },
    { $lookup: { from: 'projects', localField: 'project', foreignField: '_id', as: '_project' } },
    { $group: { _id: '$project', y: {$sum: 1}}},
  ])
  console.log(TypeCount);
};
