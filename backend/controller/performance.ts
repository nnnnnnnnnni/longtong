import { Ires } from "@/interface/response";
import { Ianswer } from "@/mongo/answer/interface";
import { Idepartment, ObjectId } from "@/mongo/department/interface";
import { IDperformance, Iperformance } from "@/mongo/performance/interface";
import { Iquestion } from "@/mongo/question/interface";
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
  let isAdmin: boolean = user.company.role != "user";
  let isDepartmentAdmin: boolean = true;
  if (user.department) {
    params.departments = { $elemMatch: { $eq: user.department.info._id } };
    if (user.department.role == "user") {
      isDepartmentAdmin = false;
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
  const performanceIds: ObjectId[] = [];
  const resData: any = data.map((item: Iperformance) => {
    let outTime: boolean = false;
    let questionNumber: number = item.questions.length;
    let departmentNumber: number = item.departments.length;
    let scoreSum: number = 0;
    performanceIds.push(item._id);
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
      isAdmin: isAdmin || isDepartmentAdmin,
    };
  });

  const answers: any[] = await db.answer.aggregate([{ $match: { user: ObjectId(user._id), performance: { $in: performanceIds } } }, { $group: { _id: "$performance", total: { $sum: 1 } } }]);

  const answersObj: any = {};
  answers.forEach((item: any) => {
    answersObj[item._id] = item.total;
  });

  resData.map((item: any) => {
    item.isAnswerd = answersObj[item._id] == item.questionNumber;
    return item;
  });

  return {
    data: resData,
  };
};

// 评测绩效详情
export const detail = async (ctx: Context): Promise<Ires> => {
  const user = ctx.user;
  const { id } = ctx.request.query;

  // 绩效题目详情
  const performance: Iperformance = await db.performance.findOne({ _id: id }).select("title questions ratio text").populate("questions", "title score answer description type");

  const answers: Ianswer[] = await db.answer.find({ performance: id, user: user._id });
  const answersObj: any = {};
  answers.forEach((answer: Ianswer) => {
    answersObj[(answer.question as ObjectId).toHexString()] = Number(answer.answer);
  });

  console.log(answersObj);

  const questionAnswers: any[] = performance.questions.map((item: Iquestion) => {
    return answersObj[item._id.toHexString()];
  });

  return {
    data: {
      performance: performance,
      answers: questionAnswers,
      isFinished: answers.length == performance.questions.length,
    },
  };
};

// 提交评测
export const submit = async (ctx: Context): Promise<any> => {
  const _user = ctx.user;
  const { answers, id } = ctx.request.body;

  const performance: IDperformance = await db.performance.findOne({ _id: id }).populate("questions", "score");
  const ratios: number[] = performance.ratio;
  const questions: Iquestion[] = performance.questions as Iquestion[];

  let sum: number = 0;
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

  // 创建答案
  answers.map(async (answer: string, index: number) => {
    await db.answer.findOneAndUpdate(
      {
        user: _user._id,
        performance: id,
        question: questions[index]._id,
      },
      {
        score: (Number(questions[index].score) * Number(answer)) / 100,
        answer: answer,
      },
      {
        upsert: true,
      }
    );
  });

  // 更新得分
  await db.score.updateOne(
    {
      user: _user,
      performance: id,
    },
    {
      $set: {
        score: sum,
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

// 获取评测信息
export const info = async (ctx: Context): Promise<Ires> => {
  const { id } = ctx.request.query;
  const user = ctx.user;
  let sum: number = 0

  const aggregateData: any = await db.answer.aggregate([
    { $match: { performance: ObjectId(id) } },
    {
      $group: {
        _id: "$question",
        sum: { $sum: 1 },
        average: { $avg: "$score" },
      },
    },
    { $lookup: { from: "questions", localField: "_id", foreignField: "_id", as: "question" } },
    { $unwind: "$question" },
  ]);

  
  const params: any = {
    performance: ObjectId(id),
  };
  if (user.department?.role == "user") {
    params.user = ObjectId(user._id);
  }
  const answers: any = await db.answer.aggregate([
    { $match: params },
    {
      $group: {
        _id: "$user",
        sum: { $sum: 1 },
        sumScore: { $sum: "$score" },
        average: { $avg: "$score" },
      },
    },
    { $lookup: { from: "users", localField: "_id", foreignField: "_id", as: "user" } },
    { $unwind: "$user" },
    {
      $project: {
        _id: 1,
        sum: 1,
        sumScore: 1,
        average: 1,
        name: '$user.userName',
        avator: '$user.avator',
      }
    }
  ]);

  const x: number[] = [];
  const yAverage: number[] = [];
  const ysumScore: number[] = [];
  aggregateData.forEach((item: any, index: number) => {
    x.push(index + 1);
    yAverage.push(item.average);
    ysumScore.push(item.question.score);
    sum += item.question.score
  });

  const performance: Iperformance = await db.performance.findOne({ _id: id });

  return {
    data: {
      sum,
      performance,
      aggregateData,
      x,
      yAverage,
      ysumScore,
      answers,
    },
  };
};
