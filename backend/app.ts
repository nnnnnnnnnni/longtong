import koa from "koa";
import bodyParser from "koa-bodyparser";
import { Config } from "./config";
const app = new koa();
import connection from "./mongo";
import applyRouter from "./routers";

connection(Config.mongo.host, Config.mongo.port, Config.mongo.name);

app.use(bodyParser());

app.use(applyRouter);

console.log(`APP HAS STARTING AT PORT: ${Config.port}`);
app.listen(Config.port);
