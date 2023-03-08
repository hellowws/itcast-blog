const { Article } = require('../../model/article')
const { Comment } = require('../../model/comment')
const article = async (req,res,)=>{
    //接受由客户端发送过来的id属性值
    const id = req.query.id
    //根据id查询文章
    let articles = await Article.findOne({_id:id}).populate('author')
    //根据id查询评论
    let comments = await Comment.find({aid:id}).populate('uid').lean()
    // return res.send(comments)
    articles = JSON.parse(JSON.stringify(articles))
    // return res.send(articles)
    return res.render('home/article',{
        articles:articles,
        comments:comments
    })
}
module.exports = article