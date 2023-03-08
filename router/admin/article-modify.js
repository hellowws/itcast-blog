const { Article } = require('../../model/article')
// 引入formidable第三方模块
const formidable = require('formidable')
const path = require('path')
//引入文件模块
const fs =require('fs')
const article_modify = async (req, res) => {   
    let {id,img} = req.query
    //待修改
    img=img.replace('\\','/')
    img=img.replace('\\','/')   
    //创建表当解析对象
    const form = new formidable.IncomingForm({
        //配置上传文件的存放位置
        uploadDir: path.join(__dirname, '../', '../', 'public', 'uploads'),
        //保留上传文件后缀
        keepExtensions: true,
    })
    // 解析对象 可能要继续完善一下功能
    form.parse(req,async (err,fileds,files)=>{
        //判断是否上传图片  默认为已经上传图片了
        let uploadImg = true
        if(files.cover.size === 0){
            uploadImg = false
        }
        if(uploadImg){
            //首先删除原有图片
            fs.unlink('public'+img,(err)=>{
                console.log(err)
            })
            //更新所有内容
            await Article.updateOne({_id:id},{
                title:fileds.title,
                publishDate:fileds.publishDate,
                cover:files.cover.filepath.split('public')[1],
                content:fileds.content,
            })
        }else{
            //不删除图片，只更新部分内容。
            await Article.updateOne({_id:id},{
                title:fileds.title,
                publishDate:fileds.publishDate,
                content:fileds.content,
            })
        }
        return res.redirect('/admin/article')
    })
}
module.exports = article_modify