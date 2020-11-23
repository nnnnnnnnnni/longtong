import { Ires } from "@/interface/response";
import { department } from "@/mongo/department";
import { Idepartment, ObjectId } from "@/mongo/department/interface";
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
export const list = async (ctx: Context): Promise<Ires> => {
  const data: Iperformance[] = await db.performance.find().populate("department").populate("question", "-answer");
  return {};
};
