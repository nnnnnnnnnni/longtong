import { Context } from "koa";
import db from "../mongo/schema";
import { Ires } from "@/interface/response";
import { Idepartment } from "@/mongo/department/interface";
import { Icompany, ObjectId } from "@/mongo/company/interface";
import { Iagree, Iapprove } from "@/mongo/approve/interface";
import { Iuser } from "@/mongo/user/interface";

// 获取审批信息(admin)
export const approveSetting = async (ctx: Context): Promise<Ires> => {
  const departments: Idepartment[] = await db.department.find();
  const companyId = ctx.user.company.info._id;
  const setting: Icompany = await db.company.findOne({ _id: companyId }).select("approve");
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
  const companyId: ObjectId = ctx.user.company.info._id as ObjectId;
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

// 创建审批
export const create = async (ctx: Context): Promise<Ires> => {
  const data = ctx.request.body;
  let approvers: ObjectId[] = [];
  let keys: ObjectId[] = [];
  let cc: (ObjectId | Iuser)[] = [];
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
  const upper: Idepartment = departmentInfo.upper as Idepartment;
  // 审批人员
  if (keySetting.admin && keySetting.admin == 1) {
    // 1: 仅本部门管理员
    // 若为本部门的管理员，则提交给上级部门管理员
    if (role == "admin") {
      upper.admins.forEach((admin: ObjectId) => {
        approvers.push(admin);
      });
    } else {
      departmentInfo.admins.forEach((admin: ObjectId) => {
        approvers.push(admin);
      });
    }
  } else if (keySetting.admin && keySetting.admin == 2) {
    // 2： 本部门管理员及上部门管理员
    // 若为本部门的管理员， 则无需keys审批，直接上级审批
    if (role == "admin") {
      upper.admins.forEach((admin: ObjectId) => {
        approvers.push(admin);
      });
    } else {
      departmentInfo.admins.forEach((admin: ObjectId) => {
        approvers.push(admin);
      });
      upper.admins.forEach((admin: ObjectId) => {
        keys.push(admin);
      });
    }
  } else if (keySetting.admin && keySetting.admin == 3 && keySetting.adminBind) {
    //本部门管理员及指定部门管理员
    const bind: Idepartment = await db.department.findOne({ _id: keySetting.adminBind });
    if (role == "admin") {
      bind.admins.forEach((admin: ObjectId) => {
        approvers.push(admin);
      });
    } else {
      departmentInfo.admins.forEach((admin: ObjectId) => {
        approvers.push(admin);
      });
      bind.admins.forEach((admin: ObjectId) => {
        keys.push(admin);
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
  const agree: Iagree = {
    approve: {
      isAgree: false,
    }
  }
  if(keys.length != 0) {
    agree.key = {
      isAgree: false,
    }
  }
  const _cc: ObjectId[] = cc as ObjectId[]
  await db.approve.create({
    user: ctx.user._id,
    type: data.type,
    extra: data.extra,
    notice: data.notice,
    status: "posted",
    approvers: approvers,
    keys: keys,
    agree: agree,
    cc: _cc,
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
      $or: [{ approvers: {$elemMatch: {$eq: userId}}, status: "posted" }, { keys: {$elemMatch: {$eq: userId}}, status: "processing" }],
      status: { $nin: ["rejected", "passed"] },
      disabled: false,
    })
    .sort({ createTime: -1 })
    .populate("agree.approve", "userName avator")
    .populate("agree.key", "userName avator")
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
  .populate("agree.approve", "userName avator")
  .populate("agree.key", "userName avator")
  return {
    data: approvers,
  };
};

const checkApproveRole = (userId: ObjectId, approve: Iapprove): any => {
  if(approve.approvers.includes(userId)) return 1
  else if(approve.keys.includes(userId)) return 2
  else return 3
}

// 设置状态
export const status = async (ctx: Context): Promise<Ires> => {
  const {status, id} = ctx.request.body;
  const userId = ctx.user._id;
  const approve: Iapprove = await db.approve.findOne({_id: id});
  if(status == 'disabled') {
    if(approve.user != userId) {
      return {
        status: 400,
        msg: '权限不足'
      }
    } else if (approve.status != 'posted'){
      return {
        status: 400,
        msg: '无法撤销'
      }
    } else {
      await db.approve.findOneAndUpdate({_id: id},{$set: {disabled: true}})
    }
  } else if(status == 'agree') {
    if(approve.user == userId) {
      return {
        status: 400,
        msg: '无法通过自己的申请'
      }
    }
    const role = checkApproveRole(userId, approve);
    if(role == 1) {
      if(approve.agree.approve.isAgree) {
        return {
          status: 400,
          msg: '同级审批已通过'
        }
      } else {
        await db.approve.update({
          _id: id,
        }, {
          $set: {
            'agree.approve': {
              user: userId,
              isAgree: true
            },
            status: approve.keys.length > 0? 'processing': 'passed'
          }
        })
      }
    } else if (role == 2) {
      if(approve.agree.key.isAgree) {
        return {
          status: 400,
          msg: '同级审批已通过'
        }
      } else {
        await db.approve.update({
          _id: id,
        }, {
          $set: {
            'agree.key': {
              user: userId,
              isAgree: true
            },
            status: 'passed'
          }
        })
      }
    } else {
      return {
        status: 400,
        msg: '权限不足'
      }
    }
  } else if (status == 'reject'){
    if(approve.user == userId) {
      return {
        status: 400,
        msg: '无法拒绝自己的申请'
      }
    }
    const role = checkApproveRole(userId, approve);
    if(role == 1) {
      if(approve.agree.approve.isAgree) {
        return {
          status: 400,
          msg: '同级审批已通过'
        }
      } else {
        await db.approve.update({
          _id: id,
        }, {
          $set: {
            'agree.approve': {
              user: userId,
              isAgree: false
            },
            status: 'rejected'
          }
        })
      }
    } else if (role == 2) {
      if(approve.agree.key.isAgree) {
        return {
          status: 400,
          msg: '同级审批已被拒绝'
        }
      } else {
        await db.approve.update({
          _id: id,
        }, {
          $set: {
            'agree.key': {
              user: userId,
              isAgree: false
            },
            status: 'rejected'
          }
        })
      }
    } else {
      return {
        status: 400,
        msg: '权限不足'
      }
    }
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
