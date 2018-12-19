require('dotenv').config()
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')
const render = require('koa-ejs')
const path = require('path')
const db = require('./db').helpers

const app = new Koa()
const router = new Router()

render(app, {
  root: path.join(__dirname, 'views'),
  layout: false,
  viewExt: 'html',
  cache: true,
  debug: true
})

app.use(bodyParser())
 
router.get('/shorten', async ctx => { 
  if(ctx.query.pass != process.env.PASSWORD) {
    ctx.status = 401
    ctx.body = 'Incorrect password'
    return
  }

  ctx.state.shortlinks = await db.getall()
  await ctx.render('shorten')
})

router.post('/create', async ctx => {
  if(await db.exists(ctx.request.body.short)) {
    ctx.body = 'Already exists'
    return
  }

  ctx.body = await db.add(ctx.request.body.short, ctx.request.body.long)
})

router.get('/delete/:url', async ctx => {
  ctx.body = await db.delete(ctx.params.url)
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(8000)