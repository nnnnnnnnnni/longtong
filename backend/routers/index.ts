import mission from "./mission";
import user from "./user";
import company from "./company";
import generic from "./generic";
import department from "./department";
import { Iroute, Irouter } from "../interface/router";
import { Context } from "koa";
import redis from "../redis";
import { Iuser } from "@/mongo/user/interface";

/**
 * 合并路由
 * @return {*}  {Irouter}   // 所有路由对象
 */
export const getAllRouter = (): Irouter => {
  let allRoutes: Irouter = {};

  const addRouter = (routers: Irouter) => {
    Object.keys(routers).forEach((path: string) => {
      if (allRoutes.hasOwnProperty(path)) {
        console.warn(`路由【${path}】已经存在`);
      }
      if (routers[path].middleware.length == 0) {
        console.warn(`路由【${path}】不存在处理函数`);
      }
      allRoutes[path] = routers[path];
    });
  };

  addRouter(mission);
  addRouter(user);
  addRouter(company);
  addRouter(generic);
  addRouter(department);

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

  if (!_router) {
    return (ctx.body = {
      status: 404,
      msg: "Not Found!",
      path: url.split("?")[0],
      data: {},
      timestamp: new Date().getTime(),
    });
  }
  if (_router.method.toUpperCase() != method.toUpperCase()) {
    return (ctx.body = {
      status: 404,
      msg: "The Method Is Illegal!",
      methods: method,
      data: {},
      timestamp: new Date().getTime(),
    });
  }

  const _allowAnonymous: boolean = _router.allowAnonymous;
  const _token = ctx.header.authorization;
  if (_token) {
    ctx.token = _token;
  }

  // 不允许匿名
  if (!_allowAnonymous) {
    // 未登录
    if (_token == null) {
      return (ctx.body = {
        status: 403,
        msg: "Need Login!",
        data: {},
        timestamp: new Date().getTime(),
      });
    } else {
      let _user: Iuser = (await redis.get(0, `TOKEN:${_token}`)) as Iuser;
      // redis内没有该用户, 则让用户重新登录
      if (!_user) {
        return (ctx.body = {
          status: 401,
          msg: "Relogin Please!",
          data: {},
          timestamp: new Date().getTime(),
        });
      } else {
        ctx.user = _user;
      }
    }
  }

  try {
    const data = await _router.middleware(ctx);
    if (data) {
      ctx.body = Object.assign(
        {
          data: {},
          status: 200,
          msg: "success",
          timestamp: new Date().getTime(),
        },
        data
      );
      await next();
    }
  } catch (error) {
    console.log(error);
    return (ctx.body = {
      status: 500,
      msg: error.toString(),
      data: {},
      timestamp: new Date().getTime(),
    });
  }
};

export default applyRouter;
