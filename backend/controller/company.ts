import { Icompany } from "@/mongo/company/interface";
import { Context } from "koa";
import db from "../mongo/schema";
import redis from "../redis";
import { generateToken } from "../lib/utils";
import { Ires } from "@/interface/response";

// 创建公司
export const create = async (ctx: Context): Promise<Ires> => {
  const userId = ctx.user._id;
  const { user, name, logo, introduction } = ctx.request.body;
  const newCompany: Icompany = await db.company.create({
    name: name,
    introduction: introduction,
    logo: logo,
    admins: [userId],
  });
  const updatedUser = await db.user
    .findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          name: user.name,
          userName: user.username || user.name,
          introduction: user.introduction,
          avator: user.logo,
          company: {
            info: newCompany._id,
            role: "creater",
          },
        },
      },
      {
        new: true,
      }
    )
    .lean()
    .exec();
  await redis.set(0, `TOKEN:${generateToken(userId.toString())}`, updatedUser);
  return {
    data: updatedUser,
  };
};

// 更新公司信息
export const update = async (ctx: Context): Promise<Ires> => {
  const companyId = ctx.user.company.info._id;
  const doc = ctx.request.body;
  const updatedCompany = await db.company
    .findOneAndUpdate(
      {
        _id: companyId,
      },
      {
        $set: doc,
      },{
        new: true
      }
    )
    .lean()
    .exec();
  return {
    data: updatedCompany
  }
};

// 获取公司信息
export const companyInfo = async (ctx: Context): Promise<Ires> => {
  const companyId = ctx.user.company.info._id;
  const field = ctx.request.query.field;
  const fieldArr = field.split(",").join(" ");
  const companyInfo = await db.company
    .findOne({
      _id: companyId,
    })
    .select(fieldArr)
    .lean()
    .exec();
  const departmentData = await db.department.find({company: companyId}).count().lean().exec();
  const projectData = await db.project.find({company: companyId}).count().lean().exec();
  return {
    data: Object.assign(companyInfo, {
      departmentCount: departmentData,
      projectCount: projectData
    }),
  };
};
