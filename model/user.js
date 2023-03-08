//创建用户集合
//引入mongoose第三方模块
const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
//测试的时候记得连接数据库！！！
// require('./connect')

//引入服务器验证规则功能
const Joi = require('joi')

//创建用户集合规则
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        minlength:2,
        maxlength:20
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    //超级管理员
    // admin
    //普通管理员
    // normal
    role:{
        type:String,
        required:true
    },
    //0启用状态
    // 1禁止状态
    state:{
        type:Number,
        default:0
    }
})

//创建集合
const User = mongoose.model('User',userSchema)

//验证用户信息
const validateUser = (user) =>{
    //定义对象的验证规则
    const schema = {
        username : Joi.string().min(2).max(12).required().error(new Error('用户名不符合规则')),
        email : Joi.string().email().required().error(new Error('邮箱格式不符和要求')),
        password : Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码格式不符和要求')),
        role:Joi.string().valid('normal','admin').required().error(new Error('角色值非法')),
        state:Joi.string().valid('0','1').required().error(new Error('状态值非法'))
    }
    //验证结果
    return Joi.validate(user,schema)
}

module.exports = {
    User,
    validateUser
}