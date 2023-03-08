const logout = (req,res) => {
    req.session.destroy(function(){
        //删除cookie 
        res.clearCookie('connect.sid')
        //重新定向到用户登录页面
        res.redirect('/admin/login')
        //清除模板中的公共用户信息
        req.app.locals.userInfo = null
    })
}
module.exports = logout