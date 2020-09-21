import koa from "koa";
import bodyParser from "koa-bodyparser";
import { Config } from "./config";
const app = new koa();
import connection from "./mongo";
import dayjs from "dayjs";
import applyRouter from "./routers";
import koaStaic from  'koa-static';

connection(Config.mongo.host, Config.mongo.port, Config.mongo.name);

// 静态文件托管
app.use(koaStaic(Config.localStatic))

app.use(bodyParser());

app.use(async (ctx: koa.Context, next: koa.Next) => {
  ctx.body = ctx.request.body;
  ctx.query = ctx.request.query;
  next();
});

app.use(async (ctx: koa.Context, next: koa.Next) => {
  const start = new Date().getTime();
  next();
  console.log(
    `${dayjs().format("MM/DD")} ${dayjs().format("hh:mm:ss")} ${ctx.method} ${
      ctx.url
    } [${ctx.response.status}] ${new Date().getTime() - start}ms`
  );
});

app.use(applyRouter);

console.log(`APP HAS STARTING AT PORT: ${Config.port}`);
app.listen(Config.port);
