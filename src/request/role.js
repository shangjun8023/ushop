// 导入
import axios from '../utils/http'

// 请求角色列表
export function getRoleList(){
    // 发送Ajax请求
    let res = axios.get('/rolelist')
    return res
}

// 添加角色列表
export function addRole(data){
    // 发送Ajax请求
    let res = axios.post('/roleadd',data)
    return res
}

// 修改角色列表
export function editRole(data){
    // 发送Ajax请求
    let res = axios.post('/roleedit',data)
    return res
}


// 删除角色列表
export function delRole(id){
    // 发送Ajax请求
    let res = axios.post('/roledelete',{id:id})
    return res
}