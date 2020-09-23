import { Context } from "koa";
import db from "../mongo/schema";
import redis from "../redis";
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
  const token = generateToken(new_user._id);
  await redis.set(0, `TOKEN:${token}`, new_user);
  ctx.user = new_user;
  return {
    data: {
      user: new_user,
      token: token,
    },
  };
};

export const login = async (ctx: Context) => {
  const mail: string = ctx.request.body.mail;
  const pass: string = ctx.request.body.pass;
  const type: number = ctx.request.body.type;
  if (type == 1) {
    if (!mail || !pass) {
      return {
        status: 400,
        msg: "信息不完整",
      };
    }
    const user = await db.user.findOne({
      mail: mail,
      password: pass,
    });
    if (!user) {
      return {
        status: 400,
        msg: "账号密码错误",
      };
    }
    delete user.password;
    const token = generateToken(user._id);
    await redis.set(0, `TOKEN:${token}`, user);
    ctx.user = user;
    return {
      data: {
        user: user,
        token: token,
      },
    };
  }
};

export const logout = async (ctx: Context) => {
  const token = ctx.request.body.token;
  if (!token) {
    return {
      status: 400,
      msg: "必须:Token",
    };
  } else {
    await redis.del(0, `TOKEN:${token}`);
    return {
      msg: "登出成功！",
    };
  }
};

export const info = async (ctx: Context): Promise<any> => {
  const token: string = ctx.token;
  if (token) {
    const redisData: any = await redis.get(0, `TOKEN:${token}`);
    let newInfo = await db.user
      .findOne({ _id: redisData._id })
      .populate("company.info")
      .lean()
      .exec();
    await redis.set(0, `TOKEN:${token}`, newInfo);
    return {
      data: newInfo,
    };
  }
};
