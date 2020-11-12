import { Context } from "koa";
import { uploadFile } from "../lib/utils";
import fs from "fs";
import { Ires } from "@/interface/response";
import db from "../mongo/schema";

// 上传文件并保存到qiniu，然后删除本地缓存
export const upload = async (ctx: Context) => {
  const file = ctx.request.files.file;
  const fileArr = file.name.split(".");
  const newName = fileArr.slice(0, -1) + "_" + new Date().getTime() + "." + fileArr[fileArr.length - 1];

  try {
    const filePath = await uploadFile(file.path, newName);
    await fs.unlinkSync(file.path);
    return {
      data: {
        file: filePath,
      },
    };
  } catch (error) {
    return error;
  }
};

// 网盘上传文件， 大小限制 500MB
export const panUpload = async (ctx: Context): Promise<Ires> => {
  const userId = ctx.user._id;
  const file = ctx.request.files.file;
  const fileArr = file.name.split(".");
  const newName = fileArr.slice(0, -1) + "_" + new Date().getTime() + "." + fileArr[fileArr.length - 1];
  const size = file.size;
  const oldName = file.name;

  try {
    const filePath = await uploadFile(file.path, newName);
    await fs.unlinkSync(file.path);
    const fileInfo = await db.pan.create({
      name: oldName,
      size: size,
      user: userId,
      url: filePath,
      disabled: false,
    });
    return {
      data: {
        file: filePath,
        infos: fileInfo,
      },
    };
  } catch (error) {
    return error;
  }
};

// 所有网盘文件
export const pans = async (ctx: Context): Promise<Ires> => {
  const data = await db.pan.find({disabled: false}).populate("user", "name avator").sort({ createTime: -1 });
  return {
    data: data,
  };
};

// 删除网盘文件
export const deleteFile = async (ctx: Context): Promise<Ires> => {
  const {id} = ctx.request.body;
  const userId = ctx.user._id;
  const isOwner = await db.pan.findOne({_id: id, user: userId});
  if(isOwner) {
    await db.pan.updateOne({_id: id}, {
      $set: {
        disabled: true
      }
    });
    return {
      msg: '删除成功'
    }
  } else {
    return {
      status: 400,
      msg: '权限不足'
    }
  }
}
