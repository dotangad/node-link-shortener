const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')
const render = require('koa-ejs')
const path = require('path')

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

  ctx.state.shortlinks = [
   {short: 'short1', long: 'long1', delete_url: 'delete/short1'},
   {short: 'short2', long: 'long2', delete_url: 'delete/short2'}
  ]
  await ctx.render('shorten')
})

router.post('/create', async ctx => {
  ctx.body = ctx.request.body
})

router.get('/delete/:url', async ctx => {
  ctx.body = ctx.params.url
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(8000)