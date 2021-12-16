import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
// import VueRouter from 'vue-router'
import router from './router'
import http from './http'

import Router from 'vue-router'
import * as echarts from '../node_modules/echarts/lib/echarts'
Vue.prototype.$echarts = echarts
import {
  DatasetComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent
} from 'echarts/components';
import {
  CanvasRenderer
} from 'echarts/renderers';
import {BarChart, PieChart} from 'echarts/charts';
Vue.prototype.$echarts.use(
  [
    TitleComponent,
    TooltipComponent,
    GridComponent,
    BarChart,
    PieChart,
    LegendComponent,
    DatasetComponent,
    CanvasRenderer
  ]
);

Vue.use(Router);
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
 
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.config.productionTip = false

// 在任意界面使用this.$http访问这个数据请求接口
Vue.prototype.$http = http

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
