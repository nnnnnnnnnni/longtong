import { Context } from "koa";
import db from "../mongo/schema";
import { Ires } from "@/interface/response";
import { Idepartment } from "@/mongo/department/interface";

// 获取审批流程人员
export const approvers = async (ctx: Context): Promise<Ires> => {
  return {}
};
