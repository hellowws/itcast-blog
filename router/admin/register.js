//引入加密插件
const bcryptjs = require('bcryptjs')
//引入数据库集合对象
const {User} = require('../../model/user')
const register = async(req,res)=>{
    const {email,username,password} = req.body
    //若浏览器禁用了JavaScript的用法后，在服务端再匹配一次。
    if(email.trim().length === 0 || password.trim().length === 0 || username.trim().length === 0){
        return res.status(400).render('admin/error',{msg:'信息未填，请重新检查一遍。'})
    }

    async function addUser(){
        const salt = await bcryptjs.genSaltSync(10)
        const pass = await bcryptjs.hash(password,salt)
        // //这里提供一个示例
        const user = await User.create({
        username:username,
        email:email,
        password:pass,
        role:'admin',
        state: 0,
        connectTimeout: 30000
        })
    }
    addUser()

    setTimeout(function(){
    },3000)
    res.status(200).render('admin/success',{msg:'注册成功'})
    res.redirect('/admin/login')
}
module.exports = register