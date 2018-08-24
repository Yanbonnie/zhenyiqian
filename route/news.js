
const Router = require('koa-router')
let news = new Router()
const newsContrl = require('../present/newsPresent')

news.post('/save', async (ctx) => {  //{newsId:'',title:"",source:"",img:"",content:"",type:"",recommend:0|1|2)}
    let params = ctx.request.body||{};
    params.content = (params.content||"").replace(/<\/?script[^>]*>?/ig, "");
    let result = await newsContrl.save(params);
    ctx.body = result
})


news.post('/recommend', async (ctx) => { // {"ids":[],"recommend":'1'}
    let params = ctx.request.body||{};
    let result = await newsContrl.updateSave(params);
    ctx.body = result
})

news.post('/removeNews', async (ctx) => { // {"id":""}
    let params = ctx.request.body||{};
    let result = await newsContrl.removeNews(params);
    ctx.body = result
})


news.get('/list/:type', async (ctx) => {   //type为0是没图，type为1是有图
    let obj = {
        page:ctx.query.page || 1,
        title:ctx.query.title,
        type:ctx.params.type
    }
    let result = await newsContrl.list(obj);
    ctx.body = result
})


news.get('/recommend/:type', async (ctx) => {   //type为1就是推荐到首页新闻列表，type为2就是推荐到首页咨讯列表
    let obj = {
        // page:ctx.query.page || 1,
        // title:ctx.query.title,
        type:ctx.params.type
    }
    let result = await newsContrl.recomendList(obj);
    ctx.body = result
})


news.get('/detail/:id', async (ctx) => {   //获取详情页
    let obj = {
        // page:ctx.query.page || 1,
        // title:ctx.query.title,
        id:ctx.params.id
    }
    let result = await newsContrl.detail(obj);
    ctx.body = result
})

module.exports = news