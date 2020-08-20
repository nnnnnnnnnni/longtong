import koa from 'koa'
import path from 'path'
import fs from 'fs'
const app = new koa()


const filepath = path.resolve(__dirname, '../', 'static', '2.jpg')

app.use(async () => {
    
})

app.listen(8000)