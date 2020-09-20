import { Context } from "koa";

export const register = async (ctx: Context) => {
  const { account, password } = ctx.body;
  if (!account || !password) {
    return {
      status: "200",
      msg: "信息不完整",
    };
  }
};

export const login = async (ctx: Context) => {
  return ctx.request.query;
};

export const logout = async (ctx: Context) => {
  return ctx.request.body;
};
