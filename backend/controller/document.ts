import { Context } from "koa";
import { Ires } from "@/interface/response";
import db from "../mongo/schema";
import { IDocument } from "@/mongo/document/interface";
import dayjs from "dayjs";

// 写文档
export const create = async (ctx: Context): Promise<Ires> => {
  const { title, body, id } = ctx.request.body;
  const userId = ctx.user._id;
  let newDoc: IDocument;
  if(id) {
    const has = await db.document.find({_id: id, author: userId})
    if(!has) return {msg: '权限不足'}
    newDoc = await db.document.findOneAndUpdate({
      _id: id
    }, {
      $set: {
        title: title,
        body: body,
      }
    },{
      new: true
    })
  } else {
    newDoc = await db.document.create({
      title: title,
      author: userId,
      body: body,
      visitors: [],
    });
  }
  return {
    data: newDoc,
    msg: "保存成功",
  };
};

// 查询文档列表
export const docs = async (ctx: Context): Promise<Ires> => {
  const { text } = ctx.request.query;
  const params: any = {};
  if (text) {
    params.title = { $regex: text, $options: "i" };
  }
  const docs: any[] = await db.document.find(params).populate("author", "name avator mail").sort({ createTime: -1 }).lean().exec();
  const _docs = docs.map((item: any) => {
    item.time = dayjs(item.createTime).format("YYYY-MM-DD");
    return item;
  });
  return {
    data: _docs,
    msg: "ok",
  };
};

// 查询iD
export const docById = async (ctx: Context): Promise<Ires> => {
  const { id } = ctx.request.query;
  const userId = ctx.user._id;
  let doc: any;
  doc = await db.document.findOne({ _id: id }).populate("author", "name avator mail").lean().exec();
  if (userId != doc.author._id) {
    doc = await db.document
      .findOneAndUpdate(
        {
          _id: id,
        },
        {
          $addToSet: { visitors: userId },
        },
        { new: true }
      )
      .populate("author", "name avator mail");
  }
  return {
    data: Object.assign(doc, {
      createTime: dayjs(doc.createTime).format("YYYY-MM-DD"),
    }),
  };
};

// 查询某人文档
export const docsByUser = async (ctx: Context): Promise<Ires> => {
  const userId = ctx.user._id;
  const params: any = {
    author: userId
  };
  const docs: any[] = await db.document.find(params).sort({ createTime: -1 }).lean().exec();
  const _docs = docs.map((item: any) => {
    item.time = dayjs(item.createTime).format("YYYY-MM-DD");
    return item;
  });
  return {
    data: _docs,
    msg: "ok",
  };
};