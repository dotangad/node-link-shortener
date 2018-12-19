const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')
const render = require('koa-ejs')

const app = new Koa()
const router = new Router()

render(app, {
  root: path.join(__dirname, 'view'),
  layout: false,
  viewExt: 'html',
  cache: true,
  debug: true
})


app.use(bodyParser())

router.get('/shorten', async ctx => {
  ctx.body = ctx.query
})

app.use(router.routes())
app.use(router.allowedMethods())