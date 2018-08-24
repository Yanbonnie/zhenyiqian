const mongoose = require('mongoose')
const Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

const News = new Schema({
    newsId : ObjectId,
    title : {type: String, index: true},
    source: String,
    content : String,
    type: {type: String, max:1, default: 0, index: true},   //0没图     //1有图
    img:String,
    createTime : {type: Number, index: true},
    recommend:{type:String,max:1,default:0, index:true},    //是否  0是不推荐，1是推荐到首页新闻列表,2推荐到咨讯列表
    recomendIndex:{type:Number,default: 0, index:true}      //推荐的顺序
})

module.exports = function(){
    mongoose.model('News', News)
}
