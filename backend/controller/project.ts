import { Context } from "koa";
import db from "../mongo/schema";
import { Iproject, ObjectId } from "@/mongo/project/interface";

// 创建项目
export const create = async (ctx: Context): Promise<any> => {
  const userId = ctx.user._id;
  const companyId = ctx.user.company.info._id;
  const doc = ctx.request.body;
  const admins =
    doc.admins.indexOf(userId) == -1 ? [...doc.admins, userId] : doc.admins;
  const newProject: Iproject = await db.project.create({
    name: doc.name,
    logo: doc.logo,
    department: doc.department,
    admins: admins,
    introduction: doc.introduction,
    company: companyId,
    members: [],
  });
  for (let i = 0; i < admins.length; i++) {
    await db.user.update(
      { _id: admins[i] },
      { $addToSet: { project: { info: newProject._id, role: "admin" } } }
    );
  }
  return {
    msg: "ok",
  };
};

// 获取所有项目
export const projects = async (ctx: Context): Promise<any> => {
  const companyId = ctx.user.company.info._id;
  const data: Iproject[] = await db.project
    .find({ company: companyId })
    .populate("admins", "name")
    .populate("members", "name")
    .populate("department");
  return {
    data: data,
  };
};

// 更新项目
export const update = async (ctx: Context): Promise<any> => {
  const doc = ctx.request.body;
  const oldProject: Iproject = await db.project.findOne({ _id: doc._id });
  delete doc._id;
  if (!oldProject) {
    return {
      status: 400,
      msg: "未找到原项目信息",
    };
  }
  await db.project.findOneAndUpdate(
    { _id: oldProject._id },
    {
      $set: doc,
    },
    {
      new: true,
    }
  );
  await db.user.update(
    {},
    { $pull: { project: { info: { $in: oldProject._id } } } },
    { multi: true }
  );
  if (doc.admins && doc.admins.length != 0) {
    for (let i = 0; i < doc.admins.length; i++) {
      await db.user.update(
        { _id: doc.admins[i] },
        { $addToSet: { project: { info: oldProject._id, role: "admin" } } }
      );
    }
  }
  if (doc.members && doc.members.length != 0) {
    for (let i = 0; i < doc.members.length; i++) {
      await db.user.update(
        { _id: doc.members[i] },
        { $addToSet: { project: { info: oldProject._id, role: "user" } } }
      );
    }
  }
  return {
    msg: "ok",
  };
};
