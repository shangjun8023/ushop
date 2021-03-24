// 使用其他文件方法，需要引入并解构
import {getBannerList} from '../../request/banner'

export default{
    // 命名空间
    namespaced: true,
    state(){
        return{
            // 存储轮播图列表数据
            bannerList:[]
        }
    },
    mutations:{
        // 初始化轮播图列表
        bannerInit(state,data){
            state.bannerList = data
        }
    },
    actions:{
        // 请求轮播图数据
        getBannerListAction({commit}){
            // axios请求后台数据
            getBannerList().then((res)=>{
                commit('bannerInit',res.list)
            })
        }
    }
}