import koa, { Next, Context } from "koa";
import Application from "koa";
import koaBody from "koa-body";
import { Config } from "./config";
const app: Application = new koa();
import connection from "./mongo";
import dayjs from "dayjs";
import applyRouter from "./routers";
import koaStaic from "koa-static";
import cors from "koa2-cors";

connection(Config.mongo.host, Config.mongo.port, Config.mongo.name);

app.use(cors());

// 静态文件托管
app.use(koaStaic(Config.localStatic));

app.use(
  koaBody({
    strict: false,
    multipart: true,
    formidable: {
      uploadDir: Config.localStatic,
      keepExtensions: true,
    },
  })
);

app.use(async (ctx: Context, next: Next) => {
  const start = new Date().getTime();
  await next();
  console.log(`${dayjs().format("MM/DD")} ${dayjs().format("hh:mm:ss")} ${ctx.method} ${ctx.url} [${ctx.response.status}] ${new Date().getTime() - start}ms`);
});

app.use(async (ctx: Context, next: Next) => {
  await applyRouter(ctx, next);
});

console.log(`APP HAS STARTING AT PORT: ${Config.port}`);
export const server = app.listen(Config.port);
