//引入mongoose模块
const mongoose = require('mongoose')
//创建评论集合规则
const commentSchema = new mongoose.Schema({
    //文章id
    aid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Article'
    },
    uid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    //评论时间
    time:{
        type:Date,
        required: [true,'请传递时间']
    },
    //评论内容
    content:{
        type:String,
        required:[true,'请传递内容']
    }
})
//创建评论集合
const Comment = mongoose.model('Comment',commentSchema)

module.exports = {
    Comment
}