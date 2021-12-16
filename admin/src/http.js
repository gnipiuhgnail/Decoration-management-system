// 接口请求
import axios from 'axios'
import Vue from 'vue'
import router from './router'
const http = axios.create({
  baseURL: 'http://localhost:3000/web/api',
})
// 在requestHead，给所有接口请求加一个请求头
http.interceptors.request.use(function (config) {
  if (localStorage.token) { config.headers.Authorization = 'Bearer ' + (localStorage.token || '') }
  return config;
}, function (error) {
  return Promise.reject(error);
});

// 通用捕获err,当用错误时，如果存在message，则会弹出
http.interceptors.response.use(res => {
  return res
}, err => {
  if (err.response.data.message) {
    Vue.prototype.$message({
      type: 'error',
      message: err.response.data.message
    })

    if(err.response.status === 401){
      router.push('/')
    }
    if(err.response.status === 402){
      router.push('/taskitemset')
    }
  }
  return Promise.reject(err)
})

// 把http这个变量导出去，在main.js中引用
export default http
