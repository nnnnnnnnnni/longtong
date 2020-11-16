import { IMission } from "@/mongo/mission/interface";
import { Context } from "koa";
import { getMissionStatus } from "../lib/utils";
import db from "../mongo/schema";

// 创建任务
export const create = async (ctx: Context) => {
  const doc = ctx.request.body;
  let missionStatus: string = getMissionStatus(doc.time[0], doc.time[1], doc.handler);
  let handlers: any[] = [];
  if (doc.handler) {
    handlers = doc.handler.map((user: string) => {
      return {
        user: user,
        isFinish: false,
        isReject: false,
      };
    });
  }
  const newMission: IMission = await db.mission.create({
    title: doc.title,
    startTime: doc.time[0],
    endTime: doc.time[1],
    priority: doc.priority,
    type: doc.type,
    organizer: ctx.user._id,
    project: doc.project,
    isAllDay: doc.isAllDay,
    status: missionStatus,
    remark: doc.remark,
    comment: [
      {
        user: ctx.user._id,
        action: "create",
        time: new Date(),
      },
    ],
    handler: handlers,
  });
  return {
    data: newMission,
  };
};

// 获取个人所有任务
export const missions = async (ctx: Context): Promise<any> => {
  const userId = ctx.user._id;
  console.log(userId)
  const { isHome, homeTab } = ctx.request.query;
  let missions: any[] = [];
  let _missions: any[] = [];
  if (isHome) {
    if (homeTab == 1) {
      missions = await db.mission
        .find({ organizer: userId, status: { $ne: "closed" } })
        .populate("handler.user")
        .populate("organizer")
        .sort({ startTime: -1 })
        .lean()
        .exec();
    } else if (homeTab == 2) {
      missions = await db.mission
        .find({ handler: {user: userId, isFinish: false, isReject: false}, status: { $ne: "closed" }, })
        .populate("handler.user")
        .populate("organizer")
        .sort({ startTime: -1 })
        .lean()
        .exec();
    } else {
      missions = await db.mission
        .find({
          $or: [{ organizer: userId }, { handler: {user: userId, isFinish: false, isReject: false} }],
          status: { $ne: "closed" }
        })
        .populate("handler.user")
        .populate("organizer")
        .sort({ startTime: -1 })
        .lean()
        .exec();
    }
  } else {
    missions = await db.mission
      .find({
        $or: [{ organizer: userId }, { "handler.user": userId }],
      })
      .populate("handler.user")
      .populate("organizer")
      .sort({ startTime: -1 })
      .lean()
      .exec();
  }
  missions.forEach((mission: any) => {
    const isOwn = mission.organizer._id == userId;
    const _mission = {
      isOwn,
      ...mission,
    };
    _missions.push(_mission);
  });
  return {
    data: _missions,
  };
};

// 通过id 获取某一任务
export const missionById = async (ctx: Context): Promise<any> => {
  const userId = ctx.user._id;
  const missionId = ctx.request.query._id;
  let mission: any = await db.mission
    .findOne({
      _id: missionId,
    })
    .populate("organizer")
    .populate("handler.user")
    .populate("comment.user")
    .populate("project", "name")
    .lean()
    .exec();
  let newStatus: string = mission.status;
  if (newStatus != "closed") {
    newStatus = getMissionStatus(mission.startTime, mission.endTime, mission.handler);
  }
  if (mission.status != newStatus) {
    mission = await db.mission
      .findOneAndUpdate({ _id: missionId }, { $set: { status: newStatus } }, { new: true })
      .populate("organizer")
      .populate("handler.user")
      .populate("comment.user")
      .populate("project", "name")
      .lean()
      .exec();
  }
  let isFinish: boolean;
  let isReject: boolean;
  mission?.handler.forEach((user: any) => {
    if (user.user._id == userId) {
      isFinish = user.isFinish;
      isReject = user.isReject;
    }
  });
  return {
    data: {
      ...mission,
      isOwn: mission.organizer._id == userId,
      isFinish,
      isReject,
    },
  };
};

// 更新单个任务
export const update = async (ctx: Context): Promise<any> => {
  const doc = ctx.request.body;
  const missionId = doc._id;
  delete doc._id;
  const oldMission: IMission = await db.mission.findOne({ _id: missionId });
  const newHandlersObj: any = {};
  doc.handler?.forEach((user: string) => {
    newHandlersObj[user] = {
      user: user,
      isFinish: false,
      isReject: false,
    };
  });
  oldMission.handler.forEach((user: any) => {
    if (newHandlersObj.hasOwnProperty(user.user)) {
      newHandlersObj[user.user] = user;
    }
  });
  let newHandlersArr: any = [];
  Object.keys(newHandlersObj).forEach((key: string) => {
    newHandlersArr.push(newHandlersObj[key]);
  });
  const newMission: IMission = await db.mission.updateOne(
    {
      _id: missionId,
    },
    {
      $push: {
        comment: { user: ctx.user._id, action: "update", time: new Date() },
      },
      $set: {
        title: doc.title,
        status: getMissionStatus(doc.startTime, doc.endTime, newHandlersArr),
        startTime: doc.startTime,
        endTime: doc.endTime,
        priority: doc.priority,
        isAllDay: doc.isAllDay,
        project: doc.project,
        type: doc.type,
        handler: newHandlersArr,
        remark: doc.remark,
      },
    },
    {
      new: true,
    }
  );
  return {
    data: newMission,
  };
};

// 移动修改时间
export const moveUpdate = async (ctx: Context): Promise<any> => {
  const doc = ctx.request.body;
  const missionId = doc._id;
  delete doc._id;
  doc.status = getMissionStatus(doc.startTime, doc.endTime, doc.handler);
  const oldMission: IMission = await db.mission.findOne({_id: missionId})
  if(oldMission.organizer != ctx.user._id){
    return {
      status: 400,
      msg: '权限不足'
    }
  }
  const newMission: IMission = await db.mission.updateOne(
    {
      _id: missionId,
    },
    {
      $push: {
        comment: { user: ctx.user._id, action: "update", time: new Date() },
      },
      $set: doc,
    },
    {
      new: true,
    }
  );
  return {
    data: newMission,
  };
};

// 任务 完成/拒绝
export const lock = async (ctx: Context): Promise<any> => {
  const { type, id } = ctx.request.body;
  const userId = ctx.user._id;
  const mission: IMission = await db.mission.findOne({ _id: id });
  let include: boolean = false;
  let handler: any = {};
  let allFinish: boolean = true;
  let isOrganizer: boolean = mission.organizer == userId;
  mission?.handler.forEach((user: any) => {
    if (!user.isFinish && !user.isReject && user.user != userId) {
      allFinish = false;
    }
    if (user.user == userId) {
      include = true;
      handler = user;
    }
  });
  if (isOrganizer && type == "close") {
    await db.mission.update(
      {
        _id: id,
      },
      {
        $set: {
          status: "closed",
        },
        $push: {
          comment: { user: ctx.user._id, action: "close", time: new Date() },
        },
      }
    );
    return {
      msg: "关闭成功！关闭",
    };
  }
  if (!include) return { status: 400, msg: "没有权限" };
  if (type == "finish") {
    await db.mission.update(
      {
        _id: id,
        "handler.user": userId,
      },
      {
        $set: {
          "handler.$.isFinish": !handler.isFinish,
          status: allFinish ? "closed" : mission.status,
        },
        $push: {
          comment: { user: ctx.user._id, action: "finish", time: new Date() },
        },
      }
    );
    return {
      msg: "完成成功！完成",
    };
  } else if (type == "reject") {
    await db.mission.update(
      {
        _id: id,
        "handler.user": userId,
      },
      {
        $set: {
          "handler.$.isReject": !handler.isReject,
          status: allFinish ? "closed" : mission.status,
        },
        $push: {
          comment: { user: ctx.user._id, action: "reject", time: new Date() },
        },
      }
    );
    return {
      msg: "拒绝成功！拒绝",
    };
  } else {
    return { msg: "参数错误" };
  }
};
