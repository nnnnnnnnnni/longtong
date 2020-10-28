import { Context } from "koa";
import db from "../mongo/schema";
import redis from "../redis";
import { generateToken } from "../lib/utils";
import { Iuser } from "@/mongo/user/interface";

// 注册管理员
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
  const token = generateToken(new_user._id.toString());
  await redis.set(0, `TOKEN:${token}`, new_user);
  ctx.user = new_user;
  return {
    data: {
      user: new_user,
      token: token,
    },
  };
};

// 登录
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
    const token = generateToken(user._id.toString());
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

// 登出
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

// 获取登陆人信息
export const main = async (ctx: Context): Promise<any> => {
  const token: string = ctx.token;
  if (token) {
    const redisData: any = await redis.get(0, `TOKEN:${token}`);
    let newInfo = await db.user.findOne({ _id: redisData._id }).populate("company.info", "name logo").populate("department.info", "name").lean().exec();
    delete newInfo.password;
    await redis.set(0, `TOKEN:${token}`, newInfo);
    return {
      data: newInfo,
    };
  }
};

// 更新个人信息
export const update = async (ctx: Context): Promise<any> => {
  const userId = ctx.user._id;
  const token: string = ctx.token;
  let doc = ctx.request.body;
  if (doc.type && doc.type == "pwd") {
    const oldUser = await db.user.find({ _id: userId, password: doc.old }).lean().exec();
    if (oldUser.length > 0) {
      doc = {
        password: doc.new,
      };
    } else {
      return {
        status: 400,
        msg: "密码不正确",
      };
    }
  }
  const updatedUser = await db.user
    .findOneAndUpdate(
      {
        _id: userId,
      },
      {
        $set: doc,
      },
      {
        new: true,
      }
    )
    .populate("company.info")
    .populate("department.info", "name")
    .lean()
    .exec();
  await redis.set(0, `TOKEN:${token}`, updatedUser);
  return {
    data: updatedUser,
  };
};

// 个人详细信息
export const userInfo = async (ctx: Context): Promise<any> => {
  let userId = ctx.user._id;
  const postUser = ctx.request.query.userId;
  const isOwn = userId == postUser
  if (postUser) userId = postUser;
  const userInfo = await db.user.findOne({ _id: userId }).populate("department.info", "name").lean().exec();
  return {
    data: Object.assign(userInfo, {
      isOwn: isOwn,
    }),
  };
};

// 用户列表
export const users = async (ctx: Context): Promise<any> => {
  const companyId = ctx.user.company.info._id;
  const options = JSON.parse(ctx.request.query.options);
  let departmentData: any[] = [];
  let jobs: string[] = [];
  let users: any[] = [];
  let params: any = {
    "company.info": companyId,
  };
  departmentData = await db.department.find({ company: companyId }).select("name").lean().exec();
  if (options.role) {
    params["company.role"] = options.role;
  }
  if (options.job) {
    params["job"] = options.job;
  }
  if (options.department) {
    params["department.info"] = options.department;
  }
  if (options.userIds) {
    params = {
      _id: { $in: options.userIds },
    };
  }
  if (options.info) {
    params = {
      $or: [
        { name: { $regex: options.info, $options: "i" }, "company.info": companyId },
        { userName: { $regex: options.info, $options: "i" }, "company.info": companyId },
        { job: { $regex: options.info, $options: "i" }, "company.info": companyId },
        { mail: { $regex: options.info, $options: "i" }, "company.info": companyId },
        { phone: { $regex: options.info, $options: "i" }, "company.info": companyId },
      ],
    };
  }
  users = await db.user.find(params).select("-password").populate("department.info", "name").sort({ "company.role": 1 }).lean().exec();
  users.forEach((user: Iuser) => {
    if (user.company.role != "creater") jobs.push(user.job);
  });
  jobs = Array.from(new Set(jobs));

  return {
    data: {
      departments: departmentData,
      jobs: jobs,
      users: users,
    },
  };
};

// 管理员添加普通用户
export const addUser = async (ctx: Context): Promise<any> => {
  const companyId = ctx.user.company.info._id;
  const doc: any = ctx.request.body;
  const findUser = await db.user.countDocuments({ mail: doc.mail });
  if (findUser) {
    return {
      status: 400,
      msg: "邮箱已存在",
    };
  }
  const newUser = await db.user.create({
    name: doc.name,
    userName: doc.userName ? doc.userName : doc.name,
    job: doc.job.toUpperCase(),
    avator: doc.avator,
    password: doc.password,
    department: {
      info: doc.department,
      role: doc.departmentRole,
    },
    mail: doc.mail,
    company: {
      info: companyId,
      role: doc.companyRole,
    },
  });
  delete newUser.password;
  if (doc.departmentRole == "user") {
    await db.department.update(
      {
        _id: doc.department,
      },
      {
        $addToSet: {
          members: newUser._id,
        },
      }
    );
  } else {
    await db.department.update(
      {
        _id: doc.department,
      },
      {
        $addToSet: {
          admins: newUser._id,
        },
      }
    );
  }
  if (doc.companyRole == "user") {
    await db.company.update(
      {
        _id: companyId,
      },
      {
        $addToSet: {
          members: newUser._id,
        },
      }
    );
  } else {
    await db.company.update(
      {
        _id: companyId,
      },
      {
        $addToSet: {
          admins: newUser._id,
        },
      }
    );
  }
  return {
    data: newUser,
  };
};

// 用户更新普通用户
export const adminUpdate = async (ctx: Context): Promise<any> => {
  const companyId = ctx.user.company.info._id;
  const doc: any = ctx.request.body;
  const oldUser: Iuser = await db.user.findOne({ _id: doc._id });
  if (!oldUser) {
    return {
      status: 400,
      msg: "用户查找错误",
    };
  }
  const newUser = await db.user
    .findOneAndUpdate(
      { _id: doc._id },
      {
        $set: {
          name: doc.name,
          mail: doc.mail,
          job: doc.job,
          "company.role": doc.companyRole,
          department: {
            info: doc.department,
            role: doc.departmentRole,
          },
        },
      }
    )
    .lean()
    .exec();
  if (oldUser.department.role == "user" && doc.departmentRole == "admin") {
    await db.department.update({ _id: oldUser.department.info }, { $pull: { members: doc._id } });
    await db.department.update({ _id: doc.department }, { $addToSet: { admins: doc._id } });
  }
  if (oldUser.department.role == "admin" && doc.departmentRole == "user") {
    await db.department.update({ _id: oldUser.department.info }, { $pull: { admins: doc._id } });
    await db.department.update({ _id: doc.department }, { $addToSet: { members: doc._id } });
  }
  if (oldUser.department.role == "admin" && doc.departmentRole == "admin") {
    await db.department.update({ _id: oldUser.department.info }, { $pull: { admins: doc._id } });
    await db.department.update({ _id: doc.department }, { $addToSet: { admins: doc._id } });
  }
  if (oldUser.department.role == "user" && doc.departmentRole == "user") {
    await db.department.update({ _id: oldUser.department.info }, { $pull: { members: doc._id } });
    await db.department.update({ _id: doc.department }, { $addToSet: { members: doc._id } });
  }
  if (oldUser.company.role == "admin" && doc.companyRole == "user") {
    await db.company.update({ _id: companyId }, { $pull: { admins: doc._id }, $addToSet: { members: doc._id } });
  }
  if (oldUser.company.role == "user" && doc.companyRole == "admin") {
    await db.company.update({ _id: companyId }, { $pull: { members: doc._id }, $addToSet: { admins: doc._id } });
  }
  return {
    msg: "更新成功",
  };
};
