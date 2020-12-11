import { Ires } from "@/interface/response";
import { Iquestion } from "@/mongo/question/interface";
import { Context } from "koa";
import db from "../mongo/schema";

// 创建题目
export const create = async (ctx: Context): Promise<Ires> => {
  const doc = ctx.request.body;
  const new_question: Iquestion = await db.question.create(Object.assign(doc, {type: 1, belong: 0}));
  return {
    data: new_question,
  };
};

// 获取所有绩效记录
export const data = async (ctx: Context): Promise<Ires> => {
  const data: Iquestion[] = await db.question.find({belong: {$in: [0, 1]}}).sort({createTime: -1});
  return {
    data: data
  };
};
