const {Article} = require('../../model/article')
// 引入分页插件
const pagination = require('mongoose-sex-page')
const article = async(req,res,next)=>{
    //声明当前页面 接受客户端传送过来的页码
    let pagecurrent = req.query.page

    //在这添加属性我们就可以在模板中拿到值
    //标识 表示访问的是文章页面 判断方法
    req.app.locals.currentLink = 'article'
    //查询所有文章 populate多集合联合查询
    let articles = await pagination(Article).find().page(pagecurrent).size(10).display(3).populate('author').exec()
    //字符串不规范问题  去你妈的，终于解决了，只要用数据库直接返回对象就行了！！用lean()方法或者toJSON()方法
    // return res.send(articles)
    //然后这个也可以解决问题
    articles = JSON.parse(JSON.stringify(articles));
    return res.render('admin/article',{
        articles:articles
    })
}
module.exports = article