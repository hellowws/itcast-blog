//1、引入moogoose模块
const mongoose = require('mongoose')
//2、创建文章集合规则
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        maxlength: 20,
        minlength: 4,
        required: [ true, '请填写']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true,'请传递作者']
    },
    publishDate: {
        type: Date,
        default:Date.now,
        required: [true,'请传递发布时间']
    },
    cover: {
        type: String,
        default: null
    },
    content: {
        type: String
    }
})
//3、根据规则创建集合
const Article = mongoose.model('Article',articleSchema)
//4、将文章集合规则作为成员模块进行导出
module.exports = {
    Article
}