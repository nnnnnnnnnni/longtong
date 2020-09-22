import { Context } from "koa";

export const upload = async (ctx: Context) => {
  const file = ctx.request.files.file;
  console.log(file.path)
  return {
    data: {
      file: file.path
    },
  };
};
