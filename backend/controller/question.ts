import { Ires } from "@/interface/response";
import { Iquestion } from "@/mongo/question/interface";
import { Context } from "koa";
import db from "../mongo/schema";

// 创建绩效操作
export const create = async (ctx: Context): Promise<Ires> => {
  const doc = ctx.request.body;
  const new_p: Iquestion = await db.question.create(doc);
  return {
    data: new_p,
  };
};

// 获取所有绩效记录
export const data = async (ctx: Context): Promise<Ires> => {
  const data: Iquestion[] = await db.question.find().populate("departments").sort({createTime: -1});
  return {
    data: data
  };
};
