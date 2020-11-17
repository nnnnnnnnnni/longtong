import { Context } from "koa";
import db from "../mongo/schema";
import { Ires } from "@/interface/response";
import { Idepartment } from "@/mongo/department/interface";
import { Icompany, ObjectId } from "@/mongo/company/interface";
import { Iapprove } from "@/mongo/approve/interface";

// 获取审批信息(admin)
export const approveSetting = async (ctx: Context): Promise<Ires> => {
  const departments: Idepartment[] = await db.department.find();
  const companyId = ctx.user.company.info._id;
  const setting = await db.company.findOne({ _id: companyId }).select("approve");
  return {
    data: {
      departments: departments,
      info: setting.approve,
    },
  };
};

// 设置审批信息(admin)
export const approveUpdate = async (ctx: Context): Promise<Ires> => {
  const doc = ctx.request.body.doc;
  const companyId = ctx.user.company.info._id;
  await db.company.updateOne(
    {
      _id: companyId,
    },
    {
      $set: {
        approve: doc,
      },
    }
  );
  return {
    msg: "保存成功",
  };
};

// TODO 创建审批
export const create = async (ctx: Context): Promise<Ires> => {
  const data = ctx.request.body;
  let approvers: any = [];
  let keys: any = [];
  let cc: ObjectId[] = [];
  let setting: Icompany = await db.company.findOne({ _id: ctx.user.company.info._id });
  const department = ctx.user.department;
  if (!department) {
    // creater 特殊处理
    return { msg: "您不需要申请", status: 400 };
  }
  const approveSetting: any = setting.approve;
  const keySetting: any = approveSetting[data.type];
  if (!keySetting) {
    // 没有设置
    return { msg: "请联系管理员设置", status: 400 };
  }
  const role: string = department.role;
  const departmentInfo: Idepartment = await db.department.findOne({ _id: department.info._id }).populate("upper");
  const upper: any = departmentInfo.upper;
  // 审批人员
  if (keySetting.admin && keySetting.admin == 1) {
    // 1: 仅本部门管理员
    // 若为本部门的管理员，则提交给上级部门管理员
    if (role == "admin") {
      upper.admins.forEach((admin: ObjectId) => {
        approvers.push({
          user: admin,
          isAgree: false,
        });
      });
    } else {
      departmentInfo.admins.forEach((admin: ObjectId) => {
        approvers.push({
          user: admin,
          isAgree: false,
        });
      });
    }
  } else if (keySetting.admin && keySetting.admin == 2) {
    // 2： 本部门管理员及上部门管理员
    // 若为本部门的管理员， 则无需keys审批，直接上级审批
    if (role == "admin") {
      upper.admins.forEach((admin: ObjectId) => {
        approvers.push({
          user: admin,
          isAgree: false,
        });
      });
    } else {
      departmentInfo.admins.forEach((admin: ObjectId) => {
        approvers.push({
          user: admin,
          isAgree: false,
        });
      });
      upper.admins.forEach((admin: ObjectId) => {
        keys.push({
          user: admin,
          isAgree: false,
        });
      });
    }
  } else if (keySetting.admin && keySetting.admin == 3 && keySetting.adminBind) {
    //本部门管理员及指定部门管理员
    const bind: Idepartment = await db.department.findOne({ _id: keySetting.adminBind });
    if (role == "admin") {
      bind.admins.forEach((admin: ObjectId) => {
        approvers.push({
          user: admin,
          isAgree: false,
        });
      });
    } else {
      departmentInfo.admins.forEach((admin: ObjectId) => {
        approvers.push({
          user: admin,
          isAgree: false,
        });
      });
      bind.admins.forEach((admin: ObjectId) => {
        keys.push({
          user: admin,
          isAgree: false,
        });
      });
    }
  } else {
    return {
      msg: "未知错误！",
    };
  }
  // 抄送人员
  if (keySetting.cc && keySetting.cc == 1) {
    // 无
  } else if (keySetting.cc && keySetting.cc == 2 && keySetting.ccBind) {
    const bind: Idepartment = await db.department.findOne({ _id: keySetting.ccBind });
    cc = bind.members;
  } else if (keySetting.cc && keySetting.cc == 3 && keySetting.ccBind) {
    const bind: Idepartment = await db.department.findOne({ _id: keySetting.ccBind });
    cc = bind.admins;
  } else if (keySetting.cc && keySetting.cc == 4 && keySetting.ccBind) {
    const bind: Idepartment = await db.department.findOne({ _id: keySetting.ccBind });
    cc = Array.from(new Set([...bind.members, ...bind.admins]));
  } else {
    return {
      msg: "未知错误！",
    };
  }
  await db.approve.create({
    user: ctx.user._id,
    type: data.type,
    extra: data.extra,
    notice: data.notice,
    status: "posted",
    approvers: approvers,
    agrees: [],
    keys: keys,
    cc: cc,
    files: [],
  });
  return {
    msg: "申请成功",
  };
};

// 获取我的审批
export const myApproves = async (ctx: Context): Promise<Ires> => {
  const userId = ctx.user._id;
  const approvers: Iapprove[] = await db.approve
    .find({
      $or: [{ "approvers.user": userId }, { "keys.user": userId, status: "processing" }],
      status: { $nin: ["rejected", "passed"] },
      disabled: false,
    })
    .sort({ createTime: -1 })
    .populate("agrees", "userName avator")
    .populate('user', 'userName avator');
  return {
    data: approvers,
  };
};

// 获取我的提交
export const myposted = async (ctx: Context): Promise<Ires> => {
  const userId = ctx.user._id;
  const approvers: Iapprove[] = await db.approve.find({ user: userId })
  .sort({ createTime: -1 })
  .populate("agrees", "userName avator")
  .populate('user', 'userName avator');
  return {
    data: approvers,
  };
};

// 设置状态
export const status = async (ctx: Context): Promise<Ires> => {
  const {status, id} = ctx.request.body;
  const userId = ctx.user._id;
  if(status == 'disabled') {
    const approve: Iapprove = await db.approve.findOne({_id: id, user: userId});
    if(!approve) {
      return {
        status: 400,
        msg: '权限不足'
      }
    } else {
      await db.approve.findOneAndUpdate({_id: id},{$set: {disabled: true}})
    }
  } else if(status == 'agree') {
    const approve: Iapprove = await db.approve.findOne({_id: id});
    if(approve.user == userId) {
      return {
        status: 400,
        msg: '无法通过自己的申请'
      }
    }

  } else if (status == 'reject'){

  } else {
    return {
      status: 400,
      msg: '参数错误'
    }
  }
  return {
    msg: '操作成功'
  };
};
