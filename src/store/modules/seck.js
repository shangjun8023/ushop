// 使用其他文件方法，需要引入并解构
import {getSeckList} from '../../request/seck'

export default{
    // 命名空间
    namespaced: true,
    state(){
        return{
            // 存储轮播图列表数据
            seckList:[]
        }
    },
    mutations:{
        // 初始化轮播图列表
        seckInit(state,data){
            state.seckList = data
        }
    },
    actions:{
        // 请求轮播图数据
        getSeckListAction({commit}){
            // axios请求后台数据
            getSeckList().then((res)=>{
                commit('seckInit',res.list)
            })
        }
    }
}