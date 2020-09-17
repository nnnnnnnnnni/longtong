import koa, { Context } from 'koa'
import { Config } from './config';
const app = new koa();
import connection from './mongo';
import { user } from './mongo/user';

connection(Config.mongo.host, Config.mongo.port, Config.mongo.name)

app.use(async (ctx: Context) => {
    const count = await user.find().count().lean().exec()
    ctx.body = count
})

console.log(`APP HAS STARTING AT PORT: ${Config.port}`);
app.listen(Config.port);
