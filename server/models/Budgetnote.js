const mongoose = require('mongoose')
// 定义 Schema:表的字段
const schema = new mongoose.Schema({
  notename:{type:String},
  sum: { type: Number },
  datetime:{type:String},
  items:{type:Array},
  userid: { type: String }
})
// 创建数据模型并导出
// 第一个参数是模型所使用用集合的单数名称
// 第二个参数是上面定义的schema，即：Schema的实例
module.exports = mongoose.model('Budgetnote', schema)