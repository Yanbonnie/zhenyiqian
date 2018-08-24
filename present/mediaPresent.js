const exec = require('../util/db')
const Meta = require('../util/meta')
const fdfs = require("../util/fdfsClient")
require('../model/media')()
let mediaPresent = {    
    async save(obj) {  //新增图片或视频
        obj.createTime = new Date().getTime();
        let r = await exec(mediaPresent.getMode, async ([model, db]) => {
            media  = await model.create(obj)
            result = new Meta(media._doc)        
            return [db,result]
        })
        return r
    },
    async list(obj){   //获取新闻列表数据
        let r = await exec(mediaPresent.getMode, async ([model, db]) => {
            let title = new RegExp(obj.title)
            let total = await model.count();
            let result;
            try{
                let list = await model.find({title}).sort({"createTime":-1}).limit(10).skip((obj.page-1)*10);
                result = new Meta(list, {total, page:Number(obj.page), pageSize:10})
            }catch(error){
                result = new Meta({},false,error)
            }
            return [db,result]
        })
        return r
    },
    async removeMedia(obj) {  //删除fdfs中的视频和图片
        let r = await exec(mediaPresent.getMode, async ([model, db]) => {
            let result;
            let id = obj.id;
            let fileId = obj.link;
            let delMsg = "";
            await fdfs.del(fileId).then(function() {
                // 删除成功  
                delMsg = "删除成功"             
                }).catch(function(err) {
                    console.log(err);
                }
            );
            try{
                removeData =  await model.remove({'_id':id})   //删除对应id在视频媒体列表的数据
                
                result = new Meta({delMsg})        
            }catch(error){
                result = new Meta({},false,error)
            }
            
            return [db,result]
        })
        return r
    },
    getMode(db){
        return [db.model("Media"), db]
    }
}

module.exports = mediaPresent