const mongoose = require('mongoose');

// 模型骨架
const Schema = new mongoose.Schema({
  deadline: {type: Date},//时间 默认值是即时生成的
  name:{type:String},//任务名称
  value:{type:String},//类型
  content: {type: String},//任务类型
  userid:{type:String},//用户id
});
// 由schema构造生成Model
//集合是小写复数schedules
module.exports = mongoose.model('Schedule', Schema)