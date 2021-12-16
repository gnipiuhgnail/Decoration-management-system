// 业主的数据库字段
const mongoose = require('mongoose')
// 定义 Schema:表的字段
const schema = new mongoose.Schema({
  name:{type:String,unique:true},
  pass:{
    type:String,
    select:false,
    set(val){
      return require('bcrypt').hashSync(val,10)
    }
  },
  // value:{type:String},
  // 在线情况
  status:{type:String,default: "down"}
})
// 创建数据模型并导出
// 第一个参数是模型所使用用集合的单数名称
// 第二个参数是上面定义的schema，即：Schema的实例
module.exports = mongoose.model('Pusers',schema)