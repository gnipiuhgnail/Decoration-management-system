// 连接数据库

module.exports= app =>{
  const mongoose = require('mongoose');
  mongoose.set('useFindAndModify', false)
  console.log("数据库1")
  var url = "mongodb://127.0.0.1:27017/management";
  mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  const connection = mongoose.connection;
  connection.once("open", function() {
    console.log("MongoDB database connection established successfully");
  });
  console.log('数据库连接成功')
}