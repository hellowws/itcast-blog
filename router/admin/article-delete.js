const {Article} = require('../../model/article')
const article_delete = async(req,res)=>{
    const id = req.query.id
    await Article.findOneAndDelete({_id:id})
    // 重定向到用户列表页面
    return res.redirect('/admin/article')
    //这里是不是还要删除图片? 功能待开发

}
module.exports = article_delete