
//  服务端的代码
 const express = require("express")
 const app = express()

// 另起一个端口，专门用来做及时通讯的
// const server = app.listen(8082)
// const io = require('socket.io')(server)
// 引入sockect.js
// require('./plugins/socket')(io)

// 全局秘钥
 app.set('secret','sun2y3ta46sg')

//  跨域
app.use(require('cors')())

// 使用req.body
 app.use(express.json())

//  静态文件托管
app.use('/uploads',express.static(__dirname+'/uploads'))

app.use('/htmls',express.static(__dirname+'/htmls'))
app.use('/index.html',express.static(__dirname+'/uploads'))

// 不建议在这里写大量的路由，可以新建route文件夹存放路由
require('./plugins/db')(app)

// 执行admin里的的函数并且将app传过去
require('./routes/admin')(app)

// 服务器
 app.listen(3000,()=>{
   console.log('http://localhost:3000');
   
 }) 