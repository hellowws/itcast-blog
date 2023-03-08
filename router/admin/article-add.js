// 引入formidable第三方模块
const formidable = require('formidable')
const path = require('path')
//引入Article集合
const {Article} = require('../../model/article')
const article_edit = (req,res)=>{
    //创建表当解析对象
    const form = new formidable.IncomingForm({
        //配置上传文件的存放位置
        uploadDir: path.join(__dirname,'../','../','public','uploads'),
            //保留上传文件后缀
        keepExtensions : true,
    })
    // 解析对象
    form.parse(req,async (err,fileds,files)=>{
        //err错误对象 如果表单解析失败 err里面存储错误信息 如果表单解析成功 err将会是null
        // return res.send(files.cover.filepath.split('public')[1])
        await Article.create({
            title:fileds.title,
            author:fileds.author,
            publishDate:fileds.publishDate,
            cover:files.cover.filepath.split('public')[1],
            content:fileds.content,
        })
        return res.redirect('/admin/article')
    })
}
module.exports = article_edit