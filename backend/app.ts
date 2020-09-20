import koa from "koa";
import bodyParser from "koa-bodyparser";
import { Config } from "./config";
const app = new koa();
import connection from "./mongo";
import applyRouter from "./routers";

connection(Config.mongo.host, Config.mongo.port, Config.mongo.name);

app.use(bodyParser());

app.use(async (ctx: koa.Context, next: koa.Next) => {
    ctx.body = ctx.request.body;
    ctx.query = ctx.request.query;
    next();
})

app.use(async (ctx: koa.Context, next: koa.Next) => {
    const time = `${new Date().getHours()}:${new Date().getMinutes()}`
    const start = new Date().getTime()
    next()
    console.log(`【${time}】 ${ctx.url} ${ctx.response.status} ${new Date().getTime()- start}ms`)
})

app.use(applyRouter);

console.log(`APP HAS STARTING AT PORT: ${Config.port}`);
app.listen(Config.port);
