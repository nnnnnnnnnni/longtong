import { Context } from "koa";
import { uploadFile } from "../lib/utils";
import fs from "fs";
import { Ires } from "@/interface/response";

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
  const file = ctx.request.files.file;
  const fileArr = file.name.split(".");
  const newName = fileArr.slice(0, -1) + "_" + new Date().getTime() + "." + fileArr[fileArr.length - 1];
  console.log(file)
  return;
};
