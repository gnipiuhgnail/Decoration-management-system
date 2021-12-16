module.exports = app =>{
  const express = require('express')
  // const router = express.Router()

// 对不同类的东西的管理的后台操作基本一样，只是前端界面的字段不一样
// 后台接口基本一样
// 模型，URL不一样
// 将连接地址与数据库模型名字联系起来
// /categories  Category

// 通用的CRUD接口
 // 创建联系人：提交数据
//  通过客户端传过来的动态参数/categories，去查找对应的模型文件Category

  // const Category = require('../../models/Category')
  // 1. 创建联系人：提交数据
  // router.post('/categories',async(req,res)=>{
  //   const model = await Category.create(req.body)
  //   res.send(model)
  // })
  // 2. 联系人列表：获取数据
  // router.get('/categories',async(req,res)=>{
  //   const items = await Category.find().limit(10)
  //   // 把找到的数据暴露给前端
  //   res.send(items)
  // })
  // 3. 获取详情页某一个详情页接口
  // router.get('/categories/:id',async(req,res)=>{
  //   const model = await Category.findById(req.params.id)
  //   res.send(model)
  // })
  // 4. 更新详情页：提交数据
  // router.put('/categories/:id',async(req,res)=>{
  //   const model = await Category.findByIdAndUpdate(req.params.id,req.body)
  //   res.send(model)
  // })
  // 5. 删除某个联系人
  // router.delete('/categories/:id',async(req,res)=>{
  //   await Category.findByIdAndDelete(req.params.id,req.body)
  //   res.send({
  //     success:true
  //   })
  // })

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// const router = express.Router()
// 因为在app.use里面定义的参数，又在router里面用，所以要在Router里面加一个参数mergeParmas
// const router = express.Router({
//   mergeParams:true
// })
//  //1. 创建联系人：提交数据
//   router.post('/',async(req,res)=>{
//     const modelName = require('inflection').classify(req.params.resource)
//     const Model = require(`../../models/${modelName}`)
//     const model = await Model.create(req.body)
//     res.send(model)
//   })

//   //2. 联系人列表：获取数据
//   router.get('/',async(req,res)=>{
//     const modelName = require('inflection').classify(req.params.resource)
//     const Model = require(`../../models/${modelName}`)
//     const items = await Model.find().limit(10)
//     res.send(items)
//   })

//   //3. 获取详情页某一个详情页接口
//   router.get('/:id',async(req,res)=>{
//     const modelName = require('inflection').classify(req.params.resource)
//     const Model = require(`../../models/${modelName}`)
//     const model = await Model.findById(req.params.id)
//     res.send(model)
//   })

//   //4. 更新详情页：提交数据
//   router.put('/:id',async(req,res)=>{
//     const modelName = require('inflection').classify(req.params.resource)
//     const Model = require(`../../models/${modelName}`)
//     const model = await Model.findByIdAndUpdate(req.params.id,req.body)
//     res.send(model)
//   })

//   //5. 删除某个联系人
//   router.delete('/:id',async(req,res)=>{
//     const modelName = require('inflection').classify(req.params.resource)
//     const Model = require(`../../models/${modelName}`)
//     await Model.findByIdAndDelete(req.params.id,req.body)
//     res.send({
//       success:true
//     })
//   })
//   // app.use('/admin/api',router)
//   // 动态参数resource来匹配url，把上面的categories删掉
//   // /admin/api/rest/后面跟任意字符
//   // 解决模型Category
//   app.use('/admin/api/rest/:resource',router)



// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
const router = express.Router({
    mergeParams:true
  })
   //1. 创建联系人：提交数据
    router.post('/',async(req,res)=>{
      const model = await req.Model.create(req.body)
      res.send(model)
    })
  
    //2. 联系人列表：获取数据
    router.get('/',async(req,res)=>{
      const items = await req.Model.find().limit(10)
      res.send(items)
    })
  
    //3. 获取详情页某一个详情页接口
    router.get('/:id',async(req,res)=>{
      const model = await req.Model.findById(req.params.id)
      res.send(model)
    })
  
    //4. 更新详情页：提交数据
    router.put('/:id',async(req,res)=>{
      const model = await req.Model.findByIdAndUpdate(req.params.id,req.body)
      res.send(model)
    })
  
    //5. 删除某个联系人
    router.delete('/:id',async(req,res)=>{
      await req.Model.findByIdAndDelete(req.params.id,req.body)
      res.send({
        success:true
      })
    })
  
  // 把
  // const modelName = require('inflection').classify(req.params.resource)
  // const Model = require(`../../models/${modelName}`)
  // 这两行代码做成中间件
  app.use('/admin/api/rest/:resource',async(req,res,next)=>{
    // 给请求对象res挂载一个Model属性，让后面的路由能够使用这个model
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../../models/${modelName}`)
    next()
  },router)
}
