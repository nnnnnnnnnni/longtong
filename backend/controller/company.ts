import { Context } from "koa";

export const create = async (ctx: Context) => {
  console.log(ctx.request.body);
};
