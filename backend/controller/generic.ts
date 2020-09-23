import { Context } from "koa";
import { uploadFile } from "../lib/utils";
import fs from 'fs';

export const upload = async (ctx: Context) => {
  const file = ctx.request.files.file;
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