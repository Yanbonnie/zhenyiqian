const exec = require('../util/db')
const Meta = require('../util/meta')
require('../model/news')()
const M = require("../util/m")

let newsPresent = {    
    /*async save(obj) {
        let r = await exec(newsPresent.getMode, async ([model, db]) => {
            let result = await model.create(obj)
            return [db,result]
        })
        return r
    },

    async list(){
        let r = await exec(newsPresent.getMode, async ([model, db]) => {
            let result = await model.find().sort({"createTime":-1})
            return [db,result]
        })
        return r
    },*/
    async save(obj) {  //新增或编辑
        obj.createTime = new Date().getTime();
        let r = await exec(newsPresent.getMode, async ([model, db]) => {
            let result;
            let _id = obj._id
            delete obj._id;
            let article;
            try{
                article = _id ? await model.update({_id}, {$set : obj}) :await model.create(obj);
                result = new Meta(article._doc)        
            }catch(error){
                result = new Meta({},false,error)
            }
            
            return [db,result]
        })
        return r
    },

    async updateSave(obj) {  //推荐到首页新闻列表
        let r = await exec(newsPresent.getMode, async ([model, db]) => {
            let [result,funcs, fail] = [{}, [], []];
            // let total = await model.find({recommend:obj.recommend}).count();
            let ids = obj.ids.split(',');  //前端传的字符串转数组
            /*try{
                await model.update({'recommend':obj.recommend},{$set:{'recommend':0}},{multi:true})
            }catch(error){
                result = new Meta({},false,error);
            }*/
            try{
                ids.forEach((item,index)=>{
                    funcs.push(async (it) => {
                        let r = await model.updateOne({'_id':item},{$set:{'recommend':obj.recommend,'recomendIndex':index+1}})
                        if(r.ok != 1){
                            fail.push(item)
                        }
                        return r
                    });
                })
                let g = M.pipeline(...funcs)
                result = await g.call(this, {ok:1})
                result = new Meta(fail);
            }catch(err){
                result = new Meta({},false,error);
            }
            return [db,result]
        })
        return r
    },

    async list(obj){   //获取新闻列表数据
        let r = await exec(newsPresent.getMode, async ([model, db]) => {
            let type = obj.type
            let title = new RegExp(obj.title)
            let total = await model.find({type:obj.type}).count();
            let result;
            try{
                let list = await model.find({type, title}).sort({"createTime":-1}).limit(10).skip((obj.page-1)*10);
                result = new Meta(list, {total, page:Number(obj.page), pageSize:10})
            }catch(error){
                result = new Meta({},false,error)
            }
            return [db,result]
        })
        return r
    },


    async recomendList(obj){   //推荐到首页新闻列表数据
        let r = await exec(newsPresent.getMode, async ([model, db]) => {
            let type = obj.type;
            let limitNum = 6;
            if(type == 2){
                limitNum = 3
            }
            let title = new RegExp(obj.title)
            let result;
            try{
                let list = await model.find({"recommend":obj.type}).sort({"recomendIndex":1}).limit(limitNum);
                result = new Meta(list)
            }catch(error){
                result = new Meta({},false,error)
            }
            return [db,result]
        })
        return r
    },

    async detail(obj){         //获取新闻详情页
        let r = await exec(newsPresent.getMode, async ([model, db]) => {
            let result;
            try{
                let list = await model.findOne({"_id":obj.id});
                result = new Meta(list._doc)
            }catch(error){
                result = new Meta({},false,error)
            }
            return [db,result]
        })
        return r
    },
    async removeNews(obj) {  //移除到推荐首页
        let r = await exec(newsPresent.getMode, async ([model, db]) => {
            let result;
            let id = obj.id;
            try{
                removeData =  await model.updateOne({'_id':id}, {$set : {"recommend":0,"recomendIndex":0}}) 
                result = new Meta(removeData)        
            }catch(error){
                result = new Meta({},false,error)
            }
            
            return [db,result]
        })
        return r
    },
    getMode(db){
        return [db.model("News"), db]
    }
}

module.exports = newsPresent