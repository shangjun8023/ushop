// 使用其他文件方法，需要引入并解构
import {getSpecsList, specsTotal,getAllSpecsList} from '../../request/specs'

export default{
    // 命名空间
    namespaced: true,
    state(){
        return{
            // 存储管理员列表数据
            specsList:[],
            // 获取管理员总数
            specsTotal:0,
            // 规格总数列表
            specsAllList:[]
        }
    },
    mutations:{
        // 初始化管理员列表
        specsInit(state,data){
            state.specsList = data
        },
        // 修改管理员总数
        setSpecsTotal(state,data){
            state.specsTotal = data
        },
        // 初始化规格总数列表
        specsAllList(state,data){
            state.specsAllList = data
        }
    },
    actions:{
        // 请求管理员数据
        getSpecsListAction({commit,dispatch},params){
            // axios请求后台数据
            getSpecsList(params).then((res)=>{
                commit('specsInit',res.list)
                dispatch('getSpecsTotalAction')
            })
        },
        // 请求管理员 总数 数据
        getSpecsTotalAction({commit}){
            // axios请求后台数据
            specsTotal().then((res)=>{
                commit('setSpecsTotal',res.list[0].total)
                // 向后台请求总数列表
                getAllSpecsList(res.list[0].total).then((res)=>{
                    commit('specsAllList',res.list)
                })
            })
        }
    }
}