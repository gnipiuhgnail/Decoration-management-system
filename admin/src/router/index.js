import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import CatagoryEdit from '../views/CatagoryEdit.vue'
import CatagoryList from '../views/CatagoryList.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [{
      path: '/categories/create', component: CatagoryEdit
    }, {//props:true,表示将:id这些URL注入到CatagoryEdit这个页面
      path: '/categories/edit/:id', component: CatagoryEdit, props:true
    }, {
      path: '/categories/list', component: CatagoryList
    }]

  }
]

const router = new VueRouter({
  routes
})

export default router
