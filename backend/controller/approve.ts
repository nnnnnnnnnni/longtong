import { Context } from "koa";
import db from "../mongo/schema";
import { Ires } from "@/interface/response";
import { Idepartment } from "@/mongo/department/interface";


// 获取审批信息
export const approveSetting = async (ctx: Context): Promise<Ires> => {
  const departments: Idepartment[] = await db.department.find();
  const companyId = ctx.user.company.info._id;
  const setting = await db.company.findOne({_id: companyId}).select('approve')
  return {
    data: {
      departments: departments,
      info: setting.approve,
    }
  }
}

// 设置审批信息
export const approveUpdate = async (ctx: Context): Promise<Ires> => {
  const doc = ctx.request.body.doc;
  const companyId = ctx.user.company.info._id;
  await db.company.updateOne({
    _id: companyId
  }, {
    $set: {
      approve: doc
    }
  })
  return {
    msg: '保存成功'
  }
}

// 获取审批流程人员
export const approvers = async (ctx: Context): Promise<Ires> => {
  return {
    data: {
      department: ctx.user.department?.info.name
    }
  }
};
