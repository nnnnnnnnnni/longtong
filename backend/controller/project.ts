import { Context } from "koa";
import db from "../mongo/schema";
import redis from "../redis";
import { Iproject } from "@/mongo/project/interface";
import { Iuser, ObjectId } from "@/mongo/user/interface";

export const create = async (ctx: Context): Promise<any> => {
  const doc = ctx.request.body;
};
