import { Icompany } from "@/mongo/company/interface";
import { Context } from "koa";
import db from "../mongo/schema";
import redis from "../redis";
import { generateToken } from "../lib/utils";

export const create = async (ctx: Context) => {
  const userId = ctx.user._id;
  const { user, name, logo, introduction } = ctx.request.body;
  const newCompany: Icompany = await db.company.create({
    name: name,
    introduction: introduction,
    logo: logo,
    Participants: [
      {
        role: "creater",
        user: userId,
      },
    ],
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
  console.log(updatedUser);
  await redis.set(0, `TOKEN:${generateToken(userId)}`, updatedUser);
  return {
    data: updatedUser,
  };
};

export const update = async (ctx: Context): Promise<any> => {
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

export const companyInfo = async (ctx: Context): Promise<any> => {
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
  return {
    data: companyInfo,
  };
};
