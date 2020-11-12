import { Ires } from "@/interface/response";
import { Idepartment, ObjectId } from "@/mongo/department/interface";
import { IDocument } from "@/mongo/document/interface";
import dayjs from "dayjs";
import { Context } from "koa";
import db from "../mongo/schema";

// 获取某人个人信息
export const infos = async (ctx: Context): Promise<any> => {
  let userId = ctx.user._id;
  const postUser = ctx.request.query.userId;
  if (postUser) userId = postUser;
  const [projects, documents] = await Promise.all([
    db.project
      .find({
        $or: [{ admins: { $eq: userId } }, { members: { $eq: userId } }],
      })
      .populate("department", "name logo")
      .limit(4)
      .lean()
      .exec(),
    db.document.find({ author: userId }).limit(5).lean().exec(),
  ]);
  const _projects = projects.map((project: any) => {
    return {
      ...project,
      isAdmin: project.admins.indexOf(userId) != -1,
    };
  });
  const _documents = documents.map((doc: any) => {
    doc.time = dayjs(doc.createTime).format("YYYY-MM-DD");
    return doc;
  });
  return {
    data: {
      projects: _projects,
      documents: _documents,
    },
  };
};

// 获取通讯录
export const address = async (ctx: Context): Promise<Ires> => {
  const companyId = ctx.user.company.info._id;
  const departments: any = await db.department
  .find({ company: companyId })
  .select("upper name admins members")
  .populate('admins', 'userName avator mail phone')
  .populate('members', 'userName avator mail phone')
  .lean();
  let upperst: string = "";
  const obj: any = {};
  departments.forEach((dep: IDocument) => {
    obj[dep._id] = Object.assign(dep, {
      chilern: [],
    });
  });
  Object.keys(obj).forEach((key) => {
    const dep = obj[key];
    if(!dep.upper || dep.upper == '') {
      upperst = dep._id;
    } else {
      obj[dep.upper].chilern.push(dep)
    }
  });

  return {
    data: obj[upperst],
  };
};
