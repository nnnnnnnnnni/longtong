import { Ires } from "@/interface/response";
import { answer } from "@/mongo/answer";
import { Idepartment, ObjectId } from "@/mongo/department/interface";
import { IDperformance, Iperformance } from "@/mongo/performance/interface";
import { Iquestion } from "@/mongo/question/interface";
import { IDscore, IMark, Iscore } from "@/mongo/score/interface";
import { Iuser } from "@/mongo/user/interface";
import { Context } from "koa";
import db from "../mongo/schema";

// 创建绩效操作
export const create = async (ctx: Context): Promise<Ires> => {
  const doc = ctx.request.body;
  const new_p: Iperformance = await db.performance.create(doc);
  return {
    data: new_p,
  };
};

// 更新绩效操作
export const update = async (ctx: Context): Promise<Ires> => {
  const doc = ctx.request.body as IDperformance;
  const id = doc._id;
  const questions = doc.questions;
  const old_questions: Iquestion[] = await db.question.find({ performances: { $eq: id } });
  const old_questions_clear: ObjectId[] = [];
  const old_questions_hold: ObjectId[] = [];
  old_questions.forEach((question: Iquestion) => {
    if (question.performances?.length == 1) {
      old_questions_clear.push(question._id);
    } else {
      old_questions_hold.push(question._id);
    }
  });
  Promise.all([
    db.question.updateMany(
      { _id: { $in: old_questions_clear } },
      {
        $set: {
          belong: 0,
        },
        $pull: {
          performances: id,
        },
      }
    ),
    db.question.updateMany(
      { _id: { $in: old_questions_hold } },
      {
        $pull: {
          performances: id,
        },
      }
    ),
    db.question.updateMany(
      { _id: { $in: questions } },
      {
        $set: {
          belong: 1,
        },
        $addToSet: {
          performances: id,
        },
      }
    ),
  ]);
  const newerformance: Iperformance = await db.performance.findOneAndUpdate({ _id: id }, { $set: doc });
  return {
    data: newerformance,
  };
};

// 获取所有部门
export const departments = async (ctx: Context): Promise<Ires> => {
  const departments: Idepartment[] = await db.department.find().select("name");
  return {
    data: departments,
  };
};

// 获取所有绩效记录
export const data = async (ctx: Context): Promise<Ires> => {
  const data: IDperformance[] = await db.performance.find().populate("departments", "name").populate("questions", "title score belong description").sort({ createTime: -1 });
  return {
    data: data,
  };
};

// 获取我的绩效记录
export const mine = async (ctx: Context): Promise<Ires> => {
  const user = ctx.user;
  const params: any = {};
  let isAdmin: boolean = true;
  if (user.department) {
    params.departments = { $elemMatch: { $eq: user.department.info._id } };
    if (user.department.role == "user") {
      isAdmin = false;
    }
  }
  const data: Iperformance[] = await db.performance
    .find(params)
    .populate("departments", "name")
    .populate("questions", "title score belong description")
    .select("startTime endTime title questions")
    .sort({ createTime: -1 })
    .lean()
    .exec();
  const resData: any = data.map((item: Iperformance) => {
    let outTime: boolean = false;
    let questionNumber: number = item.questions.length;
    let departmentNumber: number = item.departments.length;
    let scoreSum: number = 0;
    item.questions.forEach((question: Iquestion) => {
      scoreSum += question.score;
    });
    if (item.endTime < new Date()) {
      outTime = true;
    }
    delete item.questions;
    return {
      ...item,
      outTime: outTime,
      departmentNumber: departmentNumber,
      questionNumber: questionNumber,
      scoreSum: scoreSum,
      isAdmin: isAdmin,
      isAnswerd: false,
    };
  });
  return {
    data: resData,
  };
};

// 详情
export const details = async (ctx: Context): Promise<Ires> => {
  const user = ctx.user;
  const { id } = ctx.request.query;

  // 所有需要评测的同部门同等级人
  const department: Idepartment = await db.department
    .findOne({
      _id: user.department.info._id,
    })
    .select("members")
    .populate("members", "userName");
  const colleagues: any[] = department.members.filter((_user: Iuser) => {
    return _user._id != user._id;
  });
  const colleagueIds: Iuser[] = department.members.map((user: Iuser) => {
    return user._id;
  });

  // 绩效题目详情
  const performance: Iperformance = await db.performance.findOne({ _id: id }).select("title questions ratio text").populate("questions", "title score answer description type");

  // 评测了所有人的绩效列表
  const scores: IDscore[] = await db.score.find({ performance: id, user: { $in: colleagueIds }, "marks.user": user._id }).select("-marks");

  // 评测完成数 == 需要完成数，则直接返回
  if (scores.length == colleagues.length) {
    return {
      msg: "已经评测完成",
      status: 401,
    };
  }

  const scoreObj: any = {};
  scores.forEach((score: Iscore) => {
    scoreObj[score.user.toString()] = score;
  });
  const _colleagues = colleagues.map((item: any) => {
    return {
      ...item._doc,
      isFinished: scoreObj.hasOwnProperty(item._id),
    };
  });

  return {
    data: {
      colleagues: _colleagues,
      performance: performance,
    },
  };
};

export const info = async (ctx: Context): Promise<Ires> => {
  return {};
};

// 提交评测
export const submit = async (ctx: Context): Promise<any> => {
  const _user = ctx.user;
  const { answers, user, id } = ctx.request.body;

  const performance: IDperformance = await db.performance.findOne({ _id: id }).populate("questions", "score");
  const ratios: Array<number> = performance.ratio;
  const questions: Array<Iquestion> = performance.questions as Iquestion[];

  let sum: number = 0,
    oldSum: number = 0;
  // 检查答案的正确性
  answers.forEach((answer: number, index: number) => {
    sum += (Number(questions[index].score) * Number(answer)) / 100;
    if (!ratios.includes(answer)) {
      return {
        status: 400,
        msg: "非法答案",
      };
    }
  });

  if (questions.length != answers.length) {
    return {
      status: 400,
      msg: "答案不完整",
    };
  }

  const oldSocre: Iscore = await db.score.findOne({
    user: user,
    performance: id,
  });
  const marks: IMark[] = oldSocre?.marks;
  marks?.forEach((item: IMark) => {
    oldSum += item.score;
  });

  // 创建答案
  await Promise.all(
    answers.map((answer: number, index: number) => {
      db.answer.create({
        user: _user._id,
        performance: id,
        question: questions[index]._id,
        colleague: user,
        score: (Number(questions[index].score) * Number(answer)) / 100,
        answer: String(answer),
      })
    })
  );

  // 更新得分
  await db.score.updateOne(
    {
      user: user,
      performance: id,
    },
    {
      $set: {
        score: Number(((oldSum + sum) / ((marks?.length || 0) + 1)).toFixed(2)),
      },
      $addToSet: {
        marks: {
          user: _user._id,
          score: sum,
        },
      },
    },
    {
      upsert: true,
    }
  );

  return {
    msg: "success",
  };
};

// 获取对某一个人的评测
