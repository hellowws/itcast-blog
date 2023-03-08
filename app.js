//引用express框架
const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');

//导入express-session模块
const session = require('express-session');
//引入中间件
const guard = require('./middleware/loginGuard')
//引入配置模块
const config = require('config')
//引入配置生产或者是开发模式
const morgan = require('morgan')
//引入art-template模板引擎
const template = require('art-template')
//引入日期格式化moment模块
const moment = require('moment')
//创建网站服务器
const app = express();

//数据库
require('./model/connect');
// const {User} = require('./model/user')

//开放静态资源文件  相当于将静态资源给了http://localhost:3000/，这样我们可以在地址后面直接用路径访问。
// 但是html文件应该放在views中，所以还需要转换方法。
app.use(express.static(path.join(__dirname,'public')));
console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV === 'development'){
    console.log('当前是开发环境')
    //开启路劲等详细信息打印到服务端上面
    app.use(morgan('dev'))
}else{
    //当前是生产环境
    console.log(111)
    console.log('当前是生产环境')
}


//告诉express模板框架所在的位置
app.set('views',path.join(__dirname,'views'));
//告诉express框架模板的默认后缀是多少
app.set('view engine','art');
// 当渲染后缀为art的模板的时候，所使用的模板引擎是什么
app.engine('art',require('express-art-template'));

//配置模板变量
template.defaults.imports.moment = moment


//处理post请求参数
app.use(bodyparser.urlencoded({extended:false}))

//基本配置session
// app.use(session({secret: 'secret key'}))
app.use(session({
    secret: 'secret key',
    //删除cookie
    saveUninitialized: false,
    //设置cookie生效时间
    cookie:{
        maxAge:24*60*60*1000
    }
  }));



//引入路由模块
const home = require('./router/home');
const admin = require('./router/admin');


//路由拦截请求
app.use('/admin',guard)

//为路由匹配请求路径
app.use('/home',home);
app.use('/admin',admin);


//定义路由错误处理中间件 四个形参
app.use((err,req,res,next)=>{
    //将next传过来的字符串转化为对象
    const result = JSON.parse(err)
    // result  => {path:'/admin/user-edit',message:'密码错误',id:id}
    let params = []
    //进行循环，拿到后面所有带参数的值
    for(let attr in result){
        if(attr !== 'path'){
            params.push(attr + '=' + result[attr])
        }
    }
    // join方法是进行拼接字符串
    res.redirect(`${result.path}?${params.join('&')}`)
})

//监听端口
app.listen(3000);
console.log("请访问localhost:3000");