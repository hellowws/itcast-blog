//引入加密插件
const bcryptjs = require('bcryptjs')
//引入数据库集合对象
const {User} = require('../../model/user')
const login = async(req,res,next)=>{
    const {email,password} = req.body
    //若浏览器禁用了JavaScript的用法后，在服务端再匹配一次。
    if(email.trim().length === 0 || password.trim().length === 0){
        return res.status(400).render('/admin/error',{msg:'邮件地址或密码错误'})
    }
    //根据邮箱地址查询用户信息
    //如果查询了用户，user变量的值是对象类型，对象存储的是用户信息。
    //如果没有查询到用户，user变 量为空。
    let user = await User.findOne({email})
    //查询到用户   
    if(user){
        const isTrue = await bcryptjs.compareSync(password,user.password)
        //将客户端传递过来的密码和用户信息中的密码进行比对
        if(isTrue){
            // 将用户名存储到请求对象session中
            req.session.username = user.username
            //将用户角色存储在session中
            req.session.role = user.role
            //重定向到用户列表页面 req下面的app就是app.js里面的app,这样不用每次去调用req.session.username
            req.app.locals.userInfo = user
            if(user.role === 'admin'){
                return res.redirect('/admin/user')
            }else{
                //如果前往登录页面的话
                if(req.url === 'admin/login'){
                    next()
                }
                return res.redirect('/home')
            }
        }else{
            res.status(400).render('admin/error',{msg:'邮箱地址或者密码错误'})
        }
    }else{
        res.status(400).render('admin/error',{msg:'邮箱地址或者密码错误'})
    }
}
module.exports = login