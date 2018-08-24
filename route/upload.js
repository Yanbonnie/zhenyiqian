const Router = require('koa-router')
const Meta = require('../util/meta')
const mediaContrl = require('../present/mediaPresent')
let upload = new Router()

upload.post('/', async (ctx) => {   //上传图片或者视频
	let result  = ctx.req.files[0]
	ctx.body = new Meta(result)
})



upload.post('/media', async (ctx) => {   //上传图片或者视频数据
	let params = ctx.request.body||{};
    let result = await mediaContrl.save(params);
    ctx.body = result
})

upload.post('/removeMedia', async (ctx) => {   //删除视频和图片 {id:'',link:'filename'}
    let params = ctx.request.body||{};
    let result = await mediaContrl.removeMedia(params);
    ctx.body = result
})

upload.get('/mediaList', async (ctx) => {   //获取图片或者视频数据
	let obj = {
        page:ctx.query.page || 1,
        title:ctx.query.title
    }
    let result = await mediaContrl.list(obj);
    ctx.body = result
})
module.exports = upload