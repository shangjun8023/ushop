// 导入
import axios from '../utils/http'


// 获取商品规格总数
export function specsTotal(){
    // 发送Ajax请求
    let res = axios.get('/specscount')
    return res
}


// 请求商品规格  所有数据  的列表
export function getAllSpecsList(total){
    // 发送Ajax请求
    let res = axios.get('/specslist',{params:{page:1,size:total}})
    return res
}



// 请求商品规格列表
export function getSpecsList(params){
    // 发送Ajax请求
    let res = axios.get('/specslist',{params:params})
    return res
}

// 添加商品规格列表
export function addSpecs(data){
    // 发送Ajax请求
    let res = axios.post('/specsadd',data)
    return res
}

// 修改商品规格列表
export function editSpecs(data){
    // 发送Ajax请求
    let res = axios.post('/specsedit',data)
    return res
}


// 删除商品规格列表
export function delSpecs(id){
    // 发送Ajax请求
    let res = axios.post('/specsdelete',{id:id})
    return res
}


