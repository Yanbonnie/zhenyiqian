const mongoose = require('mongoose')
const Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

const Banner = new Schema({
    Id : ObjectId,
    // Id : {type: String,  default: 1},
    link:String,
    type: {type: String, max:1, default: 0},   //0代表图片   1代表视频
    newsId:String,
    title:String                               //图片的话，需要传文章标题
})

module.exports = function(){
    mongoose.model('Banner', Banner)
}
