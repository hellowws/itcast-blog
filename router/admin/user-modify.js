const {User} = require('../../model/user')
const bcryptjs = require('bcryptjs')
const user_modify = async(req,res,next)=>{
    const id = req.query.id
    const { username,email,password,role,state} = req.body
    let user = await User.findOne({_id:id})

    const isValid = await bcryptjs.compareSync(req.body.password,user.password)
    if(isValid){
        await User.updateOne({_id:id},{
            username:username,
            email:email,
            role:role,
            state:state
        })
        //重定向列表页面
        res.redirect('/admin/user')
    }else{
        let obj = {path:'/admin/user-edit',message:'密码错误',id:id}
        next(JSON.stringify(obj))
    }
}
module.exports = user_modify