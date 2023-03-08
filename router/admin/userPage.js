const {User} = require('../../model/user')
const userPage = async (req,res)=>{

    //在这添加属性我们就可以在模板中拿到值
    //标识 表示访问的是用户页面
    req.app.locals.currentLink = 'user'


    //接受客户端传过来的当前页面参数
    let page = req.query.page || 1
    //每一页显示多少条数据
    let pagesize = 10
    //查询用户数据的条数
    let count = await User.countDocuments({})
    //总页数
    let total = Math.ceil(count / pagesize)

    //页码对应的数据查询开始位置
    let start = (page-1) * pagesize

    // 将用户信息从数据库中查询出来
    let users = await User.find({}).limit(pagesize).skip(start)
    res.render('admin/user',{
        users : users,
        total : total,
        page : page
    })
}
module.exports = userPage