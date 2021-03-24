// 导入
import axios from '../utils/http'

// 请求轮播图列表
export function getSeckList(){
    // 发送Ajax请求
    let res = axios.get('/secklist')
    return res
}

// 添加轮播图列表
export function addSeck(data){
    // 发送Ajax请求
    let res = axios.post('/seckadd',data)
    return res
}

// 修改轮播图列表
export function editSeck(data){
    // 发送Ajax请求
    let res = axios.post('seckedit',data)
    return res
}


// 删除轮播图列表
export function delSeck(id){
    // 发送Ajax请求
    let res = axios.post('/seckdelete',{id:id})
    return res
}