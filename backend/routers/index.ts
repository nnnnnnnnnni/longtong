import mission from "./mission";
import user from "./user";
import { Iroute, Irouter } from "../interface/router";
import { Context } from "koa";


 /**
 * 合并路由
 * @return {*}  {Irouter}   // 所有路由对象
 */
export const getAllRouter = (): Irouter => {
  let allRoutes: Irouter = {};

  const addRouter = (routers: Irouter) => {
    Object.keys(routers).forEach((path: string) => {
      allRoutes[path] = routers[path];
    });
  };

  addRouter(mission);
  addRouter(user);

  return allRoutes;
};

const allRoutes: Irouter = getAllRouter();

/**
 *
 * 中间件 -- 处理路由
 * @param {Context} ctx
 * @param {Function} next
 * @return {*}  {Promise<any>}
 */
const applyRouter = async (ctx: Context, next: Function): Promise<any> => {
  const { url, method } = ctx;
  const _router: Iroute = allRoutes[url.split("?")[0]];
  ctx.status = 200;

  if (!_router) {
    return (ctx.body = {
      status: 404,
      msg: "Not Found!",
      data: {},
      tmp: new Date().getTime(),
    });
  }
  if (_router.method.toUpperCase() != method.toUpperCase()) {
    return (ctx.body = {
      status: 404,
      msg: "The Method Is Illegal!",
      data: {},
      tmp: new Date().getTime(),
    });
  }
  _router.middleware.forEach(async (fn: Function) => {
    try {
      const data = await fn(ctx);
      return (ctx.body = {
        status: 200,
        msg: "success",
        data: data,
      });
    } catch (error) {
      return (ctx.body = {
        status: 500,
        msg: error,
        data: {},
        tmp: new Date().getTime(),
      });
    }
  });
};

export default applyRouter;
