const express = require("express")

const app = express()
 
app.use(require('cors')())
app.use(express.json())

// 引用该文件，传入app并执行
require('./plugins/db')(app)
//  app是express()方法创建的web服务器.
// app.js这个工程的入口文件中引入了index.js中的所有的路由
require('./routes/admin')(app)

app.listen(3000,()=>{
  console.log('http://localhost:3000')
})