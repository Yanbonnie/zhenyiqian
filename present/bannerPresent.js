const exec = require('../util/db')
const Meta = require('../util/meta')
require('../model/banner')()

let bannerPresent = {    
    async save(obj) {
        let r = await exec(bannerPresent.getMode, async ([model, db]) => {
            var checkData = await model.find();
            let result;
            if(checkData.length == 0){  //先判断数据库有无数据，没有就创建一条数据
                try{
                    await await model.create(obj);
                    result = new Meta({})
                }catch(error){
                    result = new Meta({},false,error);
                }
            }else{                    //数据库有数据就更新一条数据           
                try{
                    await model.update(['link','type','newsId','title'],{$set:{'link':obj.link,'type':obj.type,'newsId':obj.newsId,'title':obj.title}},{multi:true});
                    result = new Meta({})
                }catch(error){
                    result = new Meta({},false,error);
                }            
                 
            }
            return [db,result]    
        })
        return r
    },

    async list(){
        let r = await exec(bannerPresent.getMode, async ([model, db]) => {
            // let result = await model.find().sort({"createTime":-1})
            let result;
            try{
                let list = await model.find().sort({"createTime":-1});
                result = new Meta(list)
            }catch(error){
                result = new Meta({},false,error);
            }
            return [db,result]
        })
        return r
    },
    getMode(db){
        return [db.model("Banner"), db]
    }
}

module.exports = bannerPresent