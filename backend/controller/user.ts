import { Context } from "koa";
import db from "../mongo/schema";
import { generateToken } from "../lib/utils";

export const register = async (ctx: Context): Promise<any> => {
  const mail: string = ctx.request.body.mail;
  const pass: string = ctx.request.body.pass;
  if (!mail || !pass) {
    return {
      status: 400,
      msg: "信息不完整",
    };
  }
  const new_user = await db.user.create({
    mail: mail,
    password: pass,
  });
  return {
    data: {
      user: new_user,
      token: generateToken(new_user._id),
    },
  };
};

export const login = async (ctx: Context) => {
  return ctx.request.query;
};

export const logout = async (ctx: Context) => {
  return ctx.request.body;
};
