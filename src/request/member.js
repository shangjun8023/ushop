// 导入
import axios from '../utils/http'

// 请求会员管理列表
export function getMemberList(){
    // 发送Ajax请求
    let res = axios.get('/memberlist')
    return res
}

// 添加会员管理列表
export function addMember(data){
    // 发送Ajax请求
    let res = axios.post('/memberadd',data)
    return res
}

// 修改会员管理列表
export function editMember(data){
    // 发送Ajax请求
    let res = axios.post('/memberedit',data)
    return res
}


// 删除会员管理列表
export function delMember(id){
    // 发送Ajax请求
    let res = axios.post('/memberdelete',{id:id})
    return res
}