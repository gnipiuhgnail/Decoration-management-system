import Vue from 'vue'
import VueRouter from 'vue-router'

// 注册登录
import Login from '../views/Login.vue'
import Regist from '../views/Regist.vue'

import Main from '../views/Main.vue'

// 进度管理
import Schedule from '../views/Schedules.vue'
import Receive from '../views/Receive.vue'

// 费用管理
import Budgeselect from '../views/Budgeselect.vue'
import BudgetPlan from '../views/BudgetPlan.vue'
import CostCreate from '../views/CostCreate.vue'
import ConsumeStatistics from '../views/ConsumeStatistics.vue'

// 图纸管理
import DrawsCreate from '../views/DrawsCreate.vue'
import EngineDrawsCreate from '../views/EngineDrawsCreate.vue'
import EngineDrawsList from '../views/EngineDrawsList.vue'

// 施工人员
import ContactList from '../views/ContactList.vue'

// 候选产品
import DrawsCreatesecond from '../views/DrawsCreatesecond.vue'
import ProductDrawsCreate from '../views/ProductDrawsCreate.vue'
import ProductDrawsList from '../views/ProductDrawsList.vue'

// 装修日志
import DecorationLog from '../views/DecorationLog.vue'
import EditLog from '../views/EditLog.vue'
import DecorationLogItem from '../views/DecorationLogItem.vue'

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/regist', name: 'regist', component: Regist },
    { path: '/', name: 'login', meta: { isPublic: true }, component: Login},
    {
      path: '/main', redirect: '/receive',
      name: 'main',
      component: Main,
      children: [
        // 日志管理
        {path:'/schedules',component:Schedule},
        {path: '/schedules/edit/:id', component: Schedule, props: true},
        {path:'/receive',component:Receive},

        // 费用管理
        {path:'/budgetselect',component:Budgeselect},
        {path:'/budgetselect/edit/:id',component:Budgeselect, props: true },

        {path:'/budgetplan',component:BudgetPlan},
        {path: '/budgetplan/edit/:id',component:BudgetPlan, props: true },

        {path:'/costcreate',component:CostCreate},
        {path:'/costcreate/edit/:id',component:CostCreate, props: true},

        {path:'/consumectatistics',component:ConsumeStatistics},

        // 图纸管理
        {path:'/draws/create',redirect:'/enginedraws/list',component:DrawsCreate,
        children:[
          { path: '/enginedraws/create', component: EngineDrawsCreate },
          { path: '/enginedraws/edit/:id', component: EngineDrawsCreate, props: true },
          { path: '/enginedraws/list', component: EngineDrawsList },
        ]},

          // 施工人员
        {path: '/contacts/edit/:id', component: ContactList, props: true},//props:true,表示将:id这些URL注入到CatagoryEdit这个页面
        { path: '/contacts/list', component: ContactList, props: true},

          // 候选产品
        {path:'/drawssecond/create',redirect:'/productdraws/list',component:DrawsCreatesecond,
          children:[
            { path: '/productdraws/create', component: ProductDrawsCreate },
            { path: '/productdraws/edit/:id', component: ProductDrawsCreate, props: true },
            { path: '/productdraws/list', component: ProductDrawsList },
        ]},
        // 装修日志
        {path:'/decorationlog',component:DecorationLog,props: true},
        { path: '/decorationlog/edit/:id', component:EditLog,props: true},
        { path: '/decorationlog/edit/:id', component:EditLog },
        { path: '/decorationlog/edit', component:EditLog },
        {path:'/decorationlog/list/:id',component:DecorationLogItem,props: true}
        
      ]
    }
  ]
})



router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    return next('/')

  }
  next()

})
export default router
