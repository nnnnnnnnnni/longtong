import { Ires } from "@/interface/response";
import { Iperformance } from "@/mongo/performance/interface";
import { Context } from "koa";
import db from "../mongo/schema";

// 创建绩效操作
export const create = async (ctx: Context): Promise<Ires> => {
  const doc = ctx.request.body;
  const new_p: Iperformance = await db.performance.create(doc);
  return {
    data: new_p,
  };
};

// 获取所有绩效记录
export const data = async (ctx: Context): Promise<Ires> => {
  const data: Iperformance[] = await db.performance.find().populate("departments").sort({createTime: -1});
  return {
    data: data
  };
};
