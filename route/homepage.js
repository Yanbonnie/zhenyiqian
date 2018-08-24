const Router = require('koa-router')
let home = new Router()
let moment = require('moment');
const newsContrl = require('../present/newsPresent')
const bannerContrl = require('../present/bannerPresent')
const hostLink = require('../config/config').linkUrl
home.get('/', async (ctx) =>{
    let userAgent = ctx.request.header['user-agent'];
    let deviceAgent = userAgent.toLowerCase();
    let agentID = deviceAgent.match(/(iphone os|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile)/);
    let recomendList = await newsContrl.recomendList({type:1});    //获取新闻列表数据
    let recomendThumb = await newsContrl.recomendList({type:2});   //获取新闻咨讯数据
    let banner = await bannerContrl.list();                        //获取banner数据            

    let recomendListData = recomendList.data;
    let recomendThumbData = recomendThumb.data;
    let bannerDate = banner.data[0];
    if(bannerDate.link.indexOf('https') == -1){
        bannerDate.link = 'https'+ bannerDate.link.substring(4);
    }
    if(agentID){  //移动端
        await ctx.render('h5', {
            moment,
            hostLink,
            bannerDate,
            recomendListData,
            recomendThumbData,
            isOpenApp:0,
            appState:null,
            isWx:null
    })
    }else{
        await ctx.render('index', {
            moment,
            hostLink,
            bannerDate,
            recomendListData,
            recomendThumbData
        })
    }
   
}).get('qrcode', async (ctx) =>{
    let userAgent = ctx.request.header['user-agent'];
    let deviceAgent = userAgent.toLowerCase();
    let agentID = deviceAgent.match(/(iphone os|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile)/);
    let recomendList = await newsContrl.recomendList({type:1});    //获取新闻列表数据
    let recomendThumb = await newsContrl.recomendList({type:2});   //获取新闻咨讯数据
    let banner = await bannerContrl.list();                        //获取banner数据            

    let recomendListData = recomendList.data;
    let recomendThumbData = recomendThumb.data;
    let bannerDate = banner.data[0];
    if(bannerDate.link.indexOf('https') == -1){
        bannerDate.link = 'https'+ bannerDate.link.substring(4);
    }
    if(agentID){  //移动端
        await ctx.render('h5', {
            moment,
            hostLink,
            bannerDate,
            recomendListData,
            recomendThumbData,
            isOpenApp:0,
            appState:null,
            isWx:null
    })
    }else{
        await ctx.render('index', {
            moment,
            hostLink,
            bannerDate,
            recomendListData,
            recomendThumbData
        })
    }
   
}).get('t', async(ctx) => {
    let userAgent = ctx.request.header['user-agent'];
    let deviceAgent = userAgent.toLowerCase();
    let agentID = deviceAgent.match(/(iphone os|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile)/);
    let appState = null;
    let isWx = null;
    if(deviceAgent.indexOf('android') > -1 || deviceAgent.indexOf('adr') > -1){
        appState = 'android'
    }
    if(!!deviceAgent.match(/\(i[^;]+;( u;)? cpu.+mac os x/)){
        appState = 'ios'
    }
    if(deviceAgent.match(/MicroMessenger/i) == 'micromessenger'){ 
        isWx =  1; 
    }else{ 
        isWx =  0; 
    } 
    let recomendList = await newsContrl.recomendList({type:1});    //获取新闻列表数据
    let recomendThumb = await newsContrl.recomendList({type:2});   //获取新闻咨讯数据
    let banner = await bannerContrl.list();                        //获取banner数据            

    let recomendListData = recomendList.data;
    let recomendThumbData = recomendThumb.data;
    let bannerDate = banner.data[0];
    
    if(bannerDate.link.indexOf('https') == -1){
        bannerDate.link = 'https'+ bannerDate.link.substring(4);
    }
    if(agentID){  //移动端
        await ctx.render('h5', {
            moment,
            hostLink,
            bannerDate,
            recomendListData,
            recomendThumbData,
            isOpenApp:1,
            appState:appState,
            isWx:isWx
    })
    }else{
        await ctx.render('index', {
            moment,
            hostLink,
            bannerDate,
            recomendListData,
            recomendThumbData
        })
    }
}).get('detail/:id',async (ctx) => {
    let userAgent = ctx.request.header['user-agent'];
    let deviceAgent = userAgent.toLowerCase();
    let agentID = deviceAgent.match(/(iphone os|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile)/);
    let recomendThumb = await newsContrl.recomendList({type:2});   //获取新闻咨讯数据
    let recomendThumbData = recomendThumb.data;
    let obj = {id:ctx.params.id}
    let detail = await newsContrl.detail(obj);
    if(agentID){  //移动端
        await ctx.render('h5_detail', {
            moment,
            detail,
        })
    }else{
        await ctx.render('detail', {
            moment,
            detail,
            recomendThumbData,
            hostLink
        })
    }
}).get('s',async (ctx) => {
    await ctx.render('sign')
})
module.exports = home