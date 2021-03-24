// 使用其他文件方法，需要引入并解构
import {getRoleList} from '../../request/role'

export default{
    // 命名空间
    namespaced: true,
    state(){
        return{
            // 存储角色管理列表数据
            roleList:[]
        }
    },
    mutations:{
        // 初始化角色管理列表
        roleInit(state,data){
            state.roleList = data
        }
    },
    actions:{
        // 请求角色管理数据
        getRoleListAction({commit}){
            // axios请求后台数据
            getRoleList().then((res)=>{
                commit('roleInit',res.list)
            })
        }
    }
}