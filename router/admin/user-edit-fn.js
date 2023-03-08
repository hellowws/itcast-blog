//引入加密插件
const bcryptjs = require('bcryptjs')
//引入数据库集合对象
const {User} = require('../../model/user')
//引入服务端验证规则
const {validateUser} = require('../../model/user')
const user_edit_fn = async (req,res,next)=>{
    const {email,username,password,role,state} = req.body

  
    try{
        //下载旧版本就可以使用这个方法
        await validateUser(req.body)
    }catch(e){
        //验证没有通过，我们就重定向到用户添加页面
        // return res.redirect(`/admin/user-edit?message=${e.message}`)
        return next(JSON.stringify({path:'/admin/user-edit',message:e.message}))
    }
    
    //判断邮箱是否已经存在了
    let user = await User.findOne({email:req.body.email})
    if(user){
        //res.redirect里面有一个res.end(),要不然以后有send会冲突
        return next(JSON.stringify({path:'/admin/user-edit',message:'邮箱已经被占用了'}))
    }else{
        console.log('添加数据中')
        console.log(email,username,password,role,state)
        async function addUser(){
            const salt = await bcryptjs.genSaltSync(10)
            const pass = await bcryptjs.hash(password,salt)
            const user = await User.create({
                username:username,
                email:email,
                password:pass,
                role:role,
                state:state
            })
        }
        addUser()
        return res.redirect('/admin/user')
    }

}
module.exports = user_edit_fn