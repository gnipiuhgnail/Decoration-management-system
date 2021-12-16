// 业主相关的路由

const { url } = require('inspector')
const { send } = require('process')

// app接受一个参数
module.exports = app => {
  // express 的子路由,里面会有各种增删改查的东西，
  const express = require('express')
  const jwt = require('jsonwebtoken')
  const bcrypt = require('bcrypt')
  const assert = require('http-assert')
  const fs = require('fs')
 const multer = require('multer')

  var qr = require('qr-image');
  const Pusers = require('../../models/Pusers')
      const Sort = require("../../models/Sort")
      var schedule = require('node-schedule');
  const router = express.Router({
    mergeParams: true
  })

  // 资源列表


  // 按分页显示账号列表的路由 
  router.get("/get", async(req, res, next) => {
    let currentPage = parseInt(req.query.currentPage) // 转换前端传入当前页码
    let pageSize = parseInt(req.query.pageSize) // 转换前端传入的每页大小
    let skip = (currentPage-1)*pageSize // 实现分割查询的skip
    let params = {}
    // 使用mongoose的skip,limit两个api对数据进行跳跃查询并返回查询结果
    const token = String(req.headers.authorization|| '').split(' ').pop() 
    const {id,name} = jwt.verify(token,app.get('secret'))
    // let questionsModel = await req.Model.find({"userid":id}).find(params).skip(skip).limit(pageSize)
    await req.Model.find({"userid":id}).find(params).skip(skip).limit(pageSize).exec((err, doc) => {
      if (err) {
        res.send({
          status: '1',
          msg: err.message
        })
      } else {
        res.send({
          status: '0',
          msg: '',
          result: {
            list: doc
          }
        })
      }
    })
  })

  //提交数据：一般
  router.post('/', async (req, res) => {
    const token = String(req.headers.authorization|| '').split(' ').pop() 
    // 解析id
    const {id,name} = jwt.verify(token,app.get('secret'))
    req.body["userid"]= id
    const model = await req.Model.create(req.body)
    res.send(model)
  })
 //提交数据：schedule
 router.post('/createschedule', async (req, res) => {
  const token = String(req.headers.authorization|| '').split(' ').pop() 
  // 解析id
  const {id,name} = jwt.verify(token,app.get('secret'))
  req.body["userid"]= id
  // new Date(String) 时间少8个小时的问题
  var newDate = new Date(req.body.deadline);
  var dateee = new Date(newDate).toJSON();
  var date = new Date(+newDate+ 8 * 3600 * 1000).toISOString();
  req.body.deadline = date
  const model = await req.Model.create(req.body)
  res.send(model)
})
// 提交数据：施工人员
// router.post('/createcontact', async (req, res) => {
//   const token = String(req.headers.authorization|| '').split(' ').pop() 
//   // 解析id
//   const {id,name} = jwt.verify(token,app.get('secret'))
//   req.body["userid"]= id
//   // {dest:__dirname+ '/../../uploads'}
//   fs.writeFile(`${__dirname}/../../htmls/${req.body["contact"]}.html`,
//   `<!DOCTYPE html>
//    <html lang="en">
//    <head>
//      <meta charset="UTF-8">
//      <meta http-equiv="X-UA-Compatible" content="IE=edge">
//      <meta name="viewport" content="width=device-width, initial-scale=1.0">
//      <title>拨号</title>
//    </head>
//    <body>
//      <div style="width:300px;height:120px;border:1px solid black;margin:250px auto;text-align:center;border-radius:5px;background-color:rgb(254, 181, 121)"
//      ><p style="margin-top:20px">${req.body["name"]}</p>
//      <a href='tel:${req.body["contact"]}'>点击拨号：${req.body["contact"]}</a></div>
//    </body>
//    </html>
//    `
//    ,'utf8',function(error){
//      if(error){
//        console.log(error);
//        return false;
//      }
//      console.log('写入成功');
//     })
  
//   //   // var htmlurl = multer({dest:__dirname+ '/../../Html'})
//   //   console.log({dest:__dirname+ `../../htmls/${req.body["contact"]}`})
//   //   var htmlurl = {dest:__dirname+ `../../htmls/${req.body["contact"]}`}
//   //   var qr_svg = qr.image('http://192.168.43.232:8080/', { type: 'svg' });
//   //   qr_svg.pipe(fs.createWriteStream('qr.svg'));
//   //   // http://localhost:3000
//   //   var svg_string = qr.imageSync('http://192.168.43.232:8080/uploads', { type: 'svg' });
//   //   // console.log(svg_string)
//   //   req.body.qrcode = svg_string

//     const model = await req.Model.create(req.body)
    
//     res.send(model)
// })
// 二维码
router.get('/gethref/:id', async (req, res) => {
  console.log("123")
  var items = await req.Model.findById(req.params.id)
  console.log(`${__dirname}/../../htmls/contact.html`)
  fs.writeFile(`${__dirname}+/../../htmls/contact.html`,
  `<!DOCTYPE html>
   <html lang="en">
   <head>
     <meta charset="UTF-8">
     <meta http-equiv="X-UA-Compatible" content="IE=edge">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>拨号</title>
   </head>
   <body>
     <div style="width:300px;height:120px;border:1px solid black;margin:250px auto;text-align:center;border-radius:5px;background-color:rgb(254, 181, 121)"
     ><p style="margin-top:20px">姓名：${items.name}</p>
     <a href='tel:${items.contact}'>点击可拨号：${items.contact}</a></div>
   </body>
   </html>
   `
   ,'utf8',function(error){
     if(error){
       console.log(error);
       return false;
     }
     console.log('写入成功');
    })
  // console.log(items.contact)
  // res.send(items)
})
  // 查找，不同类别，增加
//   router.post('/taskitemset/sorts',async(req,res) =>{
//   const token = String(req.headers.authorization|| '').split(' ').pop() 
//     const {id} = jwt.verify(token,app.get('secret'))
//     const {name}=req.body
//     const typename = await Sort.findOne({"name":name})
//     if(typename){
//       assert(false,402,'类别已存在')
//       return 
//     }
//     req.body["userid"]= id
//       const model = await Model.create(req.body)
//       res.send(model)
    
//  })
  //获取数据：一般
  router.get('/', async (req, res) => {
    const token = String(req.headers.authorization|| '').split(' ').pop() 
    const {id,name} = jwt.verify(token,app.get('secret'))
    const items = await req.Model.find({"userid":id})
    res.send(items)
  })

  //  获取数据：任务数据
  router.get('/getschedule', async (req, res) => {
   // console.log(req.query)
   let currentPage = parseInt(req.query.currentPage) // 转换前端传入当前页码
   let pageSize = parseInt(req.query.pageSize) // 转换前端传入的每页大小
   let skip = (currentPage-1)*pageSize // 实现分割查询的skip
   let params = {}
   // 使用mongoose的skip,limit两个api对数据进行跳跃查询并返回查询结果
   const token = String(req.headers.authorization|| '').split(' ').pop() 
   const {id,name} = jwt.verify(token,app.get('secret'))
   // let questionsModel = await req.Model.find({"userid":id}).find(params).skip(skip).limit(pageSize)
   await req.Model.find({"userid":id}).sort({'deadline':-1}).find(params).skip(skip).limit(pageSize).exec((err, doc) => {
     if (err) {
       res.send({
         status: '1',
         msg: err.message
       })
     } else {
       res.send({
         status: '0',
         msg: '',
         result: {
           list: doc
         }
       })
     }
   })
  })
  // 获取数据：未来三日任务提醒
  router.get('/receive', async (req, res) => {
    const token = String(req.headers.authorization|| '').split(' ').pop() 
    const {id,name} = jwt.verify(token,app.get('secret'))
    const items = await req.Model.find({"userid":id}).sort({'deadline':1})
  // 1.查询所有定时任务：数据库查询所有任务：时间
  // dataList
    const myDate = new Date();
    const t1 = myDate.getTime();
    const dataList = []
    for(let i in items){
      const t2 = items[i].deadline.getTime();
      if((t1 <= t2) && ((t2-t1)<=3*24*3600*1000)){
          dataList.push(items[i]);
      }
    }
    res.send(dataList)
  })
  // 获取数据：当天任务提醒
  router.get('/receive/arrive', async (req, res) => {
    const token = String(req.headers.authorization|| '').split(' ').pop() 
    const {id,name} = jwt.verify(token,app.get('secret'))
    const items = await req.Model.find({"userid":id}).sort({'deadline':1})
  // 1.查询所有定时任务：数据库查询所有任务：时间
  // dataList
    const myDate = new Date();
    const t1 = myDate.toLocaleDateString(); 
    const dataList = []
    for(let i in items){
      var newDate = new Date(items[i].deadline);
    var dateee = new Date(newDate).toJSON();
    var date = new Date(+newDate-8 * 3600 * 1000).toLocaleDateString();
      const t2 = date;
      if(t1==t2){
          dataList.push(items[i]);
      }
    }
    res.send(dataList)
  })
  // 获取数据：某个
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })
    // 分页：日志
    router.get('/get/:id', async (req, res) => {
      let currentPage = parseInt(req.query.currentPage) // 转换前端传入当前页码
    let pageSize = parseInt(req.query.pageSize) // 转换前端传入的每页大小
    let skip = (currentPage-1)*pageSize // 实现分割查询的skip
    let params = {}
    // 使用mongoose的skip,limit两个api对数据进行跳跃查询并返回查询结果
    const token = String(req.headers.authorization|| '').split(' ').pop() 
    const {id,name} = jwt.verify(token,app.get('secret'))
    // let questionsModel = await req.Model.find({"userid":id}).find(params).skip(skip).limit(pageSize)
    await req.Model.find({"userid":id}).find(params).skip(skip).limit(pageSize).exec((err, doc) => {
      if (err) {
        res.send({
          status: '1',
          msg: err.message
        })
      } else {
        res.send({
          status: '0',
          msg: '',
          result: {
            list: doc
          }
        })
      }
    })
    })
    
  //更新数据：某个
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  }) 
  // 更新数据：任务某个
  router.put('/createschedule/:id', async (req, res) => {
    var newDate = new Date(req.body.deadline);
  var dateee = new Date(newDate).toJSON();
  var date = new Date(+newDate+ 8 * 3600 * 1000).toISOString();
  req.body.deadline = date
    // req.body.deadline = new Date(req.body.deadline);
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  }) 
  // router.delete('/delcontact/:id', async (req, res) => {
    
  //   var item = await req.Model.findById(req.params.id)
  //  const filename = `${__dirname}/../../htmls/${item["contact"]}.html`
    
  //     fs.unlink(filename, function(err){
  //       if(err){
  //         throw err;
  //       }
  //       console.log('文件:删除成功！');
  //  })
    
  // await req.Model.findByIdAndDelete(req.params.id, req.body);
  //   res.send({
  //     success: true
  //   })
  // })
  //删除数据：某个数据
  router.delete('/:id', async (req, res) => {console.log(req.params.id)
    await req.Model.findByIdAndDelete(req.params.id, req.body);
    
    res.send({
      success: true
    })
  })
  
  // 更新数据：budgetnote记录
  router.put('/:notdid/:id', async (req, res) => {
    // req.params.id是记录里要删除的id号
    const token = String(req.headers.authorization|| '').split(' ').pop() 
    // 解析id
    const {id} = jwt.verify(token,app.get('secret'))
    const model = await req.Model.find({"userid":id}).findOne({"_id":req.params.notdid})
    const items = model.items;
    var sum = 0;
    for(var i = 0; i<items.length;i++){
      if(items[i]._id == req.params.id){
        items.remove(items[i])
      }
    }
    for(var j =0;j<items.length;j++){
      sum +=items[j].price*items[j].count
    }
    model.items=items;
    model.sum = sum
    await req.Model.findByIdAndUpdate(req.params.notdid, model)
    // await req.Model.update({_id:req.params.notdid},{$pull:{items:{_id:req.params.id}}})
    res.send(model)
  })

  // 查询所有信息
  router.get('/find/:data', async (req, res) => {
    const token = String(req.headers.authorization|| '').split(' ').pop() 
    const {id,name} = jwt.verify(token,app.get('secret'))
  const condition = {$or:[{"name":{$regex:req.params.data},},{"value":{$regex:req.params.data}}]}
  const model = await req.Model.find({"userid":id}).find(condition)
    res.send(model)
  })
  // 查询所有budgetnote信息
  router.get('/notefind/:data', async (req, res) => {
    const token = String(req.headers.authorization|| '').split(' ').pop() 
    const {id,name} = jwt.verify(token,app.get('secret'))
  const model = await req.Model.find({"userid":id}).find({"notename":req.params.data})
    res.send(model)
  })
  router.get('/logfind/:data', async (req, res) => {
    const token = String(req.headers.authorization|| '').split(' ').pop() 
    const {id,name} = jwt.verify(token,app.get('secret'))
  const model = await req.Model.find({"userid":id}).find({"title":req.params.data})
    res.send(model)
  })
 

// 登录校验
const auth = async(req,res,next) =>{
    const token = String(req.headers.authorization|| '').split(' ').pop() 
    assert(token,401,"请先登录")
    // 前端传过来的token，通过解密，获取用户的id，通过id，在数据库查找相应的用户，挂在到req中，使得next后面的组件都能用到
    // 解析出id
    const {id,name} = jwt.verify(token,app.get('secret'))
    assert(id,401,"请先登录")
    req.user = await Pusers.findById(id)
    assert(req.user,401,"请先登录")
    await next()
}
 

  // 把
  // const modelName = require('inflection').classify(req.params.resource)
  // const Model = require(`../../models/${modelName}`)
  // 这两行代码做成中间件
  app.use('/web/api/',router)
  app.use('/web/api/rest/:resource', auth, async (req, res, next) => {
    // 给请求对象res挂载一个Model属性，让后面的路由能够食用这个model
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../../models/${modelName}`)
    next()
  }, router);
  

  // 图片上传
 const upload = multer({dest:__dirname+ '/../../uploads'})
 app.post('/web/api/uploads',upload.single('file'),async(req,res) =>{
   const file = req.file
   file.url = `http://localhost:3000/uploads/${file.filename}`
   res.send(file)
 })

// 注册
 app.post('/web/api/regist/pusers',async(req,res)=>{
  const {name,pass,value}=req.body
  const username = await Pusers.findOne({name})
    if(username){
      return res.status(422).send({
            message:'用户名存在'
          })
    }
  const user = await Pusers.create(req.body)
  res.send(user)
  })
 
 //登录  上线处理 
function statusSetUp(oName){     
  Pusers.updateOne({name:oName},{$set: {status: 'up'}},function(err,doc){ 
      if(err){ 
          console.log(err);
      }else{ 
          console.log(oName+ "  is  up");
      }
  });
}
// 登录
app.post('/web/api/login/pusers',async(req,res)=>{
  const {name,pass,value}=req.body
  // 1.根据用户名找用户
  const user = await Pusers.findOne({name}).select('+pass')
  assert(user,422,'用户名不存在')
  // 替换
  // if(!user){
  //   return res.status(422).send({
  //     message:'用户名不存在'
  //   })
  // }
  // 2.校验密码
  const isPasswordValid = bcrypt.compareSync(
    pass,
    user.pass,
  )
  assert(isPasswordValid,422,'密码错误')
  // 添加一个错误处理函数
  // if(!isPasswordValid){
  //   return res.status(422).send({
  //     message:'密码错误'
  //   })
  // }
  // 3.返回token

//  const token = jwt.sign({id:user._id},app.get('secret'))
 const token = jwt.sign({id:user._id,name:user.name},app.get('secret'))
  statusSetUp(name);
  res.send(token)
})

// 错误提醒设置
app.use(async(err,req,res,next)=>{
  res.status(err.statusCode || 500).send({
    message:err.message
  })
})
}


