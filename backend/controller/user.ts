import { Context } from "koa";

export const login = async (ctx: Context) => {
  return ctx.request.query
};

export const logout = async (ctx: Context) => {
  return ctx.request.body
};
