import { Idepartment } from "@/mongo/department/interface";
import { Context } from "koa";
import db from "../mongo/schema";


// 创建部门
export const create = async (ctx: Context): Promise<any> => {
  const doc: Idepartment = ctx.request.body;
  const companyId = ctx.user.company.info._id;
  const userId = ctx.user._id;
  doc.admins= [userId];
  doc.company = companyId;
  const newDepartment = await db.department.create(doc);
  return {
    data: newDepartment,
  };
};

// 部门信息列表
export const departments = async (ctx: Context): Promise<any> => {
  const companyId = ctx.user.company.info._id;
  const departmentData = await db.department
    .find({ company: companyId })
    .populate('upper')
    .sort({ createTime: 1 })
    .lean()
    .exec();
  const _departmentData = departmentData.map((departmentItem: Idepartment) => {
    return {
      ...departmentItem,
      adminNum: departmentItem.admins.length,
      userNum: departmentItem.members.length,
    }
  });
  return {
    data: _departmentData,
  };
};

// 更新部门信息
export const update = async (ctx: Context): Promise<any> => {
  const doc: Idepartment = ctx.request.body;
  const UpdatedDepartment = await db.department.update({_id: doc._id}, {
    $set: {
      name: doc.name,
      upper: doc.upper
    }
  })
  return {
    msg: 'ok'
  }
}