import { Context } from "koa";
import { uploadFile } from "../lib/utils";
import fs from 'fs';

// 上传文件并保存到qiniu，然后删除本地缓存
export const upload = async (ctx: Context) => {
  const file = ctx.request.files.file;
  console.log(ctx.request.files)
  const fileArr = file.name.split('.');
  const newName = fileArr.slice(0, -1) + '_' + new Date().getTime() + '.' + fileArr[fileArr.length -1];
  
  try {
    const filePath = await uploadFile(file.path, newName);
    await fs.unlinkSync(file.path);
    return {
      data: {
        file: filePath
      },
    };
  } catch (error) {
    return error
  }
};
