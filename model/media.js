const mongoose = require('mongoose')
const Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

const Media = new Schema({
    id : ObjectId,
    title:{type:String,default:"",index:true},
    link:String,
    type: {type: String, max:1},   //0代表图片   1代表视频
    createTime : {type: Number, index: true}
})

module.exports = function(){
    mongoose.model('Media', Media)
}
