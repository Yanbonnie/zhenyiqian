const Router = require('koa-router')
let banner = new Router()
const bannerContrl = require('../present/bannerPresent')

banner.post('/save', async (ctx) => {   
    let params = ctx.request.body;
    let result = await bannerContrl.save(params);
    ctx.body = result;
    // xss(params.content)
    // bannerContrl.create(params)
    // let bannerContrl = new bannerContrl(params)
    // let result = await bannerContrl.save()
})

banner.get('/list', async (ctx) => {
    let result = await bannerContrl.list();
    ctx.body = result
})


module.exports = banner