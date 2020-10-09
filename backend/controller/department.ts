import { Idepartment, ObjectId } from "@/mongo/department/interface";
import { Context } from "koa";
import db from "../mongo/schema";

// 创建部门
export const create = async (ctx: Context): Promise<any> => {
  const doc: Idepartment = ctx.request.body;
  const companyId = ctx.user.company.info._id;
  const userId = ctx.user._id;
  doc.admins = [userId];
  doc.company = companyId;
  const newDepartment = await db.department.create(doc);
  return {
    data: newDepartment,
  };
};

// 部门信息列表
export const departments = async (ctx: Context): Promise<any> => {
  const companyId = ctx.user.company.info._id;
  const departmentData = await db.department.find({ company: companyId })
  .populate("upper")
  .populate('admins', 'name')
  .populate('members', 'name')
  .sort({ createTime: 1 }).lean().exec();
  const _departmentData = departmentData.map((departmentItem: Idepartment) => {
    return {
      ...departmentItem,
      adminNum: departmentItem.admins.length,
      userNum: departmentItem.members.length,
    };
  });
  return {
    data: _departmentData,
  };
};

// 更新部门信息
export const update = async (ctx: Context): Promise<any> => {
  const doc: Idepartment = ctx.request.body;
  const UpdatedDepartment = await db.department.update(
    { _id: doc._id },
    {
      $set: {
        name: doc.name,
        upper: doc.upper,
      },
    }
  );
  return {
    msg: "ok",
  };
};

// 删除部门
export const deleteDep = async (ctx: Context): Promise<any> => {
  const departmentId = ctx.request.body.departmentId;
  const uppers = await db.department
    .find({ upper: departmentId })
    .lean()
    .exec();
  const department = await db.department.findOne({_id: departmentId}).lean().exec();
  if(department.admins && department.admins.length != 0) {
    return {
      status: 400,
      msg: "该单位存在管理员，请先移除",
    };
  }
  if(department.members && department.members.length != 0) {
    return {
      status: 400,
      msg: "该单位存在成员，请先移除",
    };
  }
  if (uppers.length != 0) {
    return {
      status: 400,
      msg: "存在下级单位，请先解绑",
    };
  } else {
    await db.department.remove({ _id: ObjectId(departmentId) }).lean().exec();
    return {
      msg: "删除成功",
    };
  }
};
