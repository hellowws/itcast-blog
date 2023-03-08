const {Article} = require('../../model/article')
const article_edit = async (req,res)=>{
    //在这添加属性我们就可以在模板中拿到值
    //标识 表示访问的是文章页面
    req.app.locals.currentLink = 'article'
    //先拿到id值进行判断现在处于哪个页面
    const {username,id} = req.query
    if(id){
        let article = await Article.findOne({_id:id}).lean()
        res.render('admin/article-edit',{
            id:id,
            username:username,
            link:`/admin/article-modify?id=${id}&img=${article.cover}`,
            article
        })
    }else{
        res.render('admin/article-edit',{
            link:'/admin/article-add'
        })
    }
}
module.exports = article_edit