// 导入
import axios from '../utils/http'

// 请求轮播图列表
export function getBannerList(){
    // 发送Ajax请求
    let res = axios.get('/bannerlist')
    return res
}

// 添加轮播图列表
export function addBanner(data){
    // 发送Ajax请求
    let res = axios.post('/banneradd',data)
    return res
}

// 修改轮播图列表
export function editBanner(data){
    // 发送Ajax请求
    let res = axios.post('banneredit',data)
    return res
}


// 删除轮播图列表
export function delBanner(id){
    // 发送Ajax请求
    let res = axios.post('/bannerdelete',{id:id})
    return res
}