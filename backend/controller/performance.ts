import { Ires } from "@/interface/response";
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
  const new_p: Iperformance = await db.performance.findOneAndUpdate({ _id: id }, { $set: doc });
  return {
    data: new_p,
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
  const data: IDperformance[] = await db.performance.find()
    .populate("departments", "name")
    .populate("questions", "title score belong description")
    .sort({ createTime: -1 });
  return {
    data: data,
  };
};

// 获取我的绩效记录
export const mine = async (ctx: Context): Promise<Ires> => {
  const user = ctx.user;
  const params: any = {};
  if(user.department) {
    params.departments= { $elemMatch: { $eq: user.department.info._id } }
  }
  const data: Iperformance[] = await db.performance
    .find(params)
    .populate("departments", "name")
    .populate("questions", "title score belong description")
    .select('startTime endTime title questions')
    .sort({ createTime: -1 })
    .lean()
    .exec()
  const resData: any = data.map((item: Iperformance) => {
    let outTime: boolean = false;
    let questionNumber: number = item.questions.length;
    let departmentNumber: number = item.departments.length;
    let scoreSum: number = 0;
    item.questions.forEach((question: Iquestion) => {
      scoreSum += question.score;
    })
    if(item.endTime < new Date()) {
      outTime = true;
    }
    delete item.questions;
    return {
      ...item,
      outTime: outTime,
      departmentNumber: departmentNumber,
      questionNumber: questionNumber,
      scoreSum: scoreSum
    }
  })
  return {
    data: resData,
  };
};

export const detail = async (ctx: Context): Promise<Ires> => {



  return {

  }
}