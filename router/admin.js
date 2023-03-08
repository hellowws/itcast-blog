//引用express框架
const express = require('express')
//创建博客展示页面路由
const admin = express.Router()



//将页面文件挂载到路由上面
//用户登录页面
admin.get('/login',require('./admin/loginPage'))
//用户注册页面
// admin.get('/register',require('./admin/registerPage'))
//创建用户列表页面
admin.get('/user',require('./admin/userPage'))
//新增用户页面
admin.get('/user-edit',require('./admin/user-edit'))
//用户退出页面
admin.get('/logout',require('./admin/logout'))
//删除用户功能
admin.get('/user-delete',require('./admin/user-delete'))

//实现登录功能
admin.post('/login',require('./admin/login'))
//实现注册功能
// admin.post('/register',require('./admin/register'))
//实现添加功能
admin.post('/user-edit-fn',require('./admin/user-edit-fn'))
//实现修改功能
admin.post('/user-modify',require('./admin/user-modify'))



//文章列表页面路由
admin.get('/article',require('./admin/article'))
//文章编辑页面的路由
admin.get('/article-edit',require('./admin/article-edit'))
//文章删除功能的路由
admin.get('/article-delete',require('./admin/article-delete'))
//文章添加功能的路由
admin.post('/article-add',require('./admin/article-add'))
//文章的编辑功能的路由
admin.post('/article-modify',require('./admin/article-modify'))




//将路由对象作为模块对象进行输出导出
module.exports=admin
