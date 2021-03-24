// 导入
import axios from '../utils/http'

// 管理员登录
export function userLogin(data){
    // 发送Ajax请求
    let res = axios.post('/userlogin',data)
    return res
}

// 获取管理员总数
export function userTotal(){
    // 发送Ajax请求
    let res = axios.get('/usercount')
    return res
}




// 请求管理员列表
export function getUserList(params){
    // 发送Ajax请求
    let res = axios.get('/userlist',{params:params})
    return res
}

// 添加管理员列表
export function addUser(data){
    // 发送Ajax请求
    let res = axios.post('/useradd',data)
    return res
}

// 修改管理员列表
export function editUser(data){
    // 发送Ajax请求
    let res = axios.post('/useredit',data)
    return res
}


// 删除管理员列表
export function delUser(uid){
    // 发送Ajax请求
    let res = axios.post('/userdelete',{uid:uid})
    return res
}


