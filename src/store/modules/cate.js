// 使用其他文件方法，需要引入并解构
import {getCateList} from '../../request/cate'

export default{
    // 命名空间
    namespaced: true,
    state(){
        return{
            // 存储商品分类列表数据
            cateList:[]
        }
    },
    mutations:{
        // 初始化商品分类列表
        cateInit(state,data){
            state.cateList = data
        }
    },
    actions:{
        // 请求商品分类数据
        getCateListAction({commit}){
            // axios请求后台数据
            getCateList().then((res)=>{
                commit('cateInit',res.list)
            })
        }
    }
}