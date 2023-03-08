const guard = ((req,res,next)=>{
    //没有登录或者是没有登录的session信息，不能进入管理页面，跟客户端的没有登录就不能进行评论。
    if(req.url !== '/login' &&  !req.session.username){
        res.redirect('/admin/login')
    }else{
        next()
    }
    //现在有个需求：想要拦截role为normal的普通用户，只能前往/admin/login,不能前往/admin的其他页面，利用session.role来判断
    if(req.session.role === 'normal'){
        if(req.url !== '/admin/login'){
            return res.redirect('/home')
        }
    }
})
module.exports = guard