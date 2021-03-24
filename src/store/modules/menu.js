// 使用其他文件方法，需要引入并解构
import {getMenuList} from '../../request/menu'

export default{
    // 命名空间
    namespaced: true,
    state(){
        return{
            // 存储菜单列表数据
            menuList:[]
        }
    },
    mutations:{
        // 初始化菜单列表
        menuInit(state,data){
            state.menuList = data
        }
    },
    actions:{
        // 请求菜单数据
        getMenuListAction({commit}){
            // axios请求后台数据
            getMenuList().then((res)=>{
                commit('menuInit',res.list)
            })
        }
    }
}