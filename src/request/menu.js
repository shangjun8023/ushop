// 导入
import axios from '../utils/http'

// 请求菜单列表
export function getMenuList(){
    // 发送Ajax请求
    let res = axios.get('/menulist?istree=1')
    return res
}

// 添加菜单列表
export function addMenu(data){
    // 发送Ajax请求
    let res = axios.post('/menuadd',data)
    return res
}

// 修改菜单列表
export function editMenu(data){
    // 发送Ajax请求
    let res = axios.post('/menuedit',data)
    return res
}


// 删除菜单列表
export function delMenu(id){
    // 发送Ajax请求
    let res = axios.post('/menudelete',{id:id})
    return res
}