const {User} = require('../../model/user')
const user_edit = async(req,res)=>{

    //在这添加属性我们就可以在模板中拿到值
    //标识 表示访问的是用户页面
    req.app.locals.currentLink = 'user'

    const {message, id} = req.query
    //如果id存在，表示就是一个修改页面
    if(id){
        let user = await User.findOne({_id:id})
        res.render('admin/user-edit',{
            user :user,
            message : message,
            link:'/admin/user-modify?id=' + id,
            button:'修改'
        })
    }else{
        res.render('admin/user-edit',{
            message : message,
            link:'/admin/user-edit-fn',
            button:'添加'
        })
    }
}
module.exports = user_edit