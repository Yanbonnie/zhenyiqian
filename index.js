const Koa = require('koa')
const fs = require('fs')
const path = require('path')
const app = new Koa()

/*路由中间键 */
const Router = require('koa-router')

/*请求数据获取中间键 */
const bodyParser = require('koa-bodyparser')
const multer = require('koa-multer')

/*路由 */
const homeRoute = require('./route/homepage')
const news = require('./route/news')
const banner = require('./route/banner')
const uploadRoute = require('./route/upload')

const FdfsStorage = require('./util/fdfs')

let router = new Router();

//加载配置   
let upload = multer({ storage: new FdfsStorage() });  

//使用ctx.body解析中间件
app.use(upload.any());
app.use(bodyParser());

/*koa-static中间键 */
const static = require('koa-static')
//静态资源目录对于相对入口文件index.js的路径
const staticPath = './static';
app.use(static(
  path.join(__dirname,staticPath)
))

//模板引擎
const views = require('koa-views')
//加载模板引擎
app.use(views(path.join(__dirname,'./view'),{
  extension:'ejs'
}))


// 装载所有子路由
router.use('/', homeRoute.routes(), homeRoute.allowedMethods())
router.use('/api/news', news.routes(), news.allowedMethods())
router.use('/api/banner', banner.routes(), banner.allowedMethods())
router.use('/api/upload', uploadRoute.routes(), uploadRoute.allowedMethods())
// router.use('/h5', h5.routes(), h5.allowedMethods())

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())

app.listen(4000, () => {
  console.log('[demo] route-use-middleware is starting at port 4000')
})