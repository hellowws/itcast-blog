const { Comment } = require('../../model/comment')
const comment = async (req,res,)=>{
    const {content,uid,aid} = req.body
    //将评论添加到评论集合当中
    await Comment.create({
        content:content,
        uid:uid,
        aid:aid,
        time:new Date()
    })
    //将页面重定向到文章页面
    return res.redirect('/home/article?id='+aid)
    // return res.send('ok')
}
module.exports = comment