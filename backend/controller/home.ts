import { IMission, ObjectId } from "@/mongo/mission/interface";
import { Context } from "koa";
import db from "../mongo/schema";

// 获取pie图三个信息
export const infos = async (ctx: Context): Promise<any> => {
  const companyId = ctx.user.company.info._id;
  const userId = ctx.user._id;
  const [projectCount, TypeCount, priorityCount] = await Promise.all([
    db.mission.aggregate([
      { $match: { company: ObjectId(companyId) } },
      {
        $lookup: {
          from: "projects",
          localField: "project",
          foreignField: "_id",
          as: "project_info",
        },
      },
      { $unwind: "$project_info" },
      { $group: { _id: "$project_info.name", y: { $sum: 1 } } },
    ]),
    db.mission.aggregate([
      { $match: { company: ObjectId(companyId) } },
      { $group: { _id: "$type", y: { $sum: 1 } } },
    ]),
    db.mission.aggregate([
      { $match: { company: ObjectId(companyId) } },
      { $group: { _id: "$priority", y: { $sum: 1 } } },
    ]),
  ]);
  projectCount.map((item: any) => {
    item.name = item._id;
    return item;
  });
  TypeCount.map((item: any) => {
    item.name = item._id;
    return item;
  });
  priorityCount.map((item: any) => {
    item.name = item._id;
    return item;
  });
  return {
    data: {
      projectCount: projectCount,
      TypeCount: TypeCount,
      priorityCount: priorityCount,
    },
  };
};
