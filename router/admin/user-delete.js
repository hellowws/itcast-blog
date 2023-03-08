const {User} = require('../../model/user')
const user_delete = async(req,res)=>{
    const id = req.query.id
    await User.findOneAndDelete({_id:id})
    // 重定向到用户列表页面
    return res.redirect('/admin/user')
}
module.exports = user_delete