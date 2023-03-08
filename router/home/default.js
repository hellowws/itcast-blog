const {Article} = require('../../model/article')
// 引入分页插件
const pagination = require('mongoose-sex-page')
const defaultpage = async (req,res)=>{
    let page = req.query.page
    //查询所有文章 populate多集合联合查询
    let articles = await pagination(Article).find().page(page).size(2).display(3).populate('author').exec()
    articles = JSON.parse(JSON.stringify(articles));
    // return res.send(articles)
    return res.render('home/default',{
        articles:articles
    })
}
module.exports = defaultpage