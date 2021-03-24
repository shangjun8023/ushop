// 导入
import axios from '../utils/http'

// 请求商品分类列表
export function getCateList(){
    // 发送Ajax请求
    let res = axios.get('/catelist?istree=1')
    return res
}

// 添加商品分类列表
export function addCate(data){
    // 发送Ajax请求
    let res = axios.post('/cateadd',data)
    return res
}

// 修改商品分类列表
export function editCate(data){
    // 发送Ajax请求
    let res = axios.post('/cateedit',data)
    return res
}


// 删除商品分类列表
export function delCate(id){
    // 发送Ajax请求
    let res = axios.post('/catedelete',{id:id})
    return res
}