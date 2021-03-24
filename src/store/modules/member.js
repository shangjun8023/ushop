// 使用其他文件方法，需要引入并解构
import {getMemberList} from '../../request/member'

export default{
    // 命名空间
    namespaced: true,
    state(){
        return{
            // 存储会员管理列表数据
            memberList:[]
        }
    },
    mutations:{
        // 初始化会员管理列表
        memberInit(state,data){
            state.memberList = data
        }
    },
    actions:{
        // 请求会员管理数据
        getMemberListAction({commit}){
            // axios请求后台数据
            getMemberList().then((res)=>{
                commit('memberInit',res.list)
            })
        }
    }
}