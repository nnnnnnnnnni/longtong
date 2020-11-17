import { Ires } from "@/interface/response";
import { Idepartment, ObjectId } from "@/mongo/department/interface";
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
  const departments: any = await db.department
    .find()
    .select("upper name admins members")
    .populate("admins", "userName avator mail phone")
    .populate("members", "userName avator mail phone")
    .lean();
  let upperst: string = "";
  const obj: any = {};
  departments.forEach((dep: Idepartment) => {
    obj[dep._id] = {
      _id: dep._id,
      admins: dep.admins,
      members: dep.members,
      slots: {icon: 'bank'},
      key: dep._id,
      title: dep.name,
      upper: dep.upper,
      children: [],
    };
    obj[dep._id].admins.forEach((admin: any) => {
      obj[dep._id].children.push({
        _id: admin._id,
        key: `admin_${admin._id}_${Math.random()}`,
        slots: { icon: 'star'},
        title: `${admin.userName}  -- ${admin.mail}`,
        children: [],
      });
    })
    obj[dep._id].members.forEach((member: any) => {
      obj[dep._id].children.push({
        _id: member._id,
        key: `member_${member._id}_${Math.random()}`,
        slots: { icon: 'smile'},
        title: `${member.userName}  -- ${member.mail}`,
        children: [],
      });
    })
  });
  Object.keys(obj).forEach((key) => {
    const dep = obj[key];
    if (!dep.upper || dep.upper == "") {
      delete dep.admins;
      delete dep.members;
      upperst = dep._id;
    } else {
      obj[dep.upper].children.push({
        _id: dep._id,
        slots: {icon: 'bank'},
        key: `department_${dep._id}_${Math.random()}`,
        title: dep.title,
        upper: dep.upper,
        children: dep.children,
      });
    }
  });

  return {
    data: obj[upperst].children,
  };
};
