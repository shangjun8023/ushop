// 导入
import axios from '../utils/http'


// 获取商品总数
export function goodsTotal(){
    // 发送Ajax请求
    let res = axios.get('/goodscount')
    return res
}




// 请求商品列表
export function getGoodsList(params){
    // 发送Ajax请求
    let res = axios.get('/goodslist',{params:params})
    return res
}

// 添加商品列表
export function addGoods(data){
    // 发送Ajax请求
    let res = axios.post('/goodsadd',data)
    return res
}

// 修改商品列表
export function editGoods(data){
    // 发送Ajax请求
    let res = axios.post('/goodsedit',data)
    return res
}


// 删除商品列表
export function delGoods(id){
    // 发送Ajax请求
    let res = axios.post('/goodsdelete',{id:id})
    return res
}


