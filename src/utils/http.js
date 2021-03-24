// 引入
import axios from 'axios'
import Vue from 'vue'
import router from '../router'

// 全局配置
axios.defaults.baseURL = 'http://localhost:3000/api',

// 请求拦截器
axios.interceptors.request.use(function(config){
    // 判断 如果不是登录接口，需要携带请求头
    if(config.url!='/userLogin'){
        // 携带请求头
        let userInfo = JSON.parse(localStorage.getItem('userInfo')||'{}')
        let token = userInfo.token
        config.headers.authorization = token
        return config
    }
    return config
})

// 响应拦截器
axios.interceptors.response.use(function(response){
    // 判断 如果是403登录过期，跳转到登录页
    if(response.data.code==403){
        router.push('/login')
        return response.data
    }
    return response.data
})

// 挂载到原型上
Vue.prototype.$http = axios

// 导出
export default axios