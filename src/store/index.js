// 导入vue和vuex
import Vue from 'vue'
import Vuex from 'vuex'

// 导入module
import menu from './modules/menu'
// 导入role
import role from './modules/role'
// 导入user
import user from './modules/user'

// 导入cate
import cate from './modules/cate'

// 导入specs
import specs from './modules/specs'

// 导入goods
import goods from './modules/goods'

// 导入member
import member from './modules/member'

// 导入banner
import banner from './modules/banner'

// 导入seck
import seck from './modules/seck'

// 注册
Vue.use(Vuex)

// 创建实例
let store = new Vuex.Store({
    state:{},
    getters:{},
    mutations:{},
    actions:{},
    // modules: 按功能将数据和数据操作方法分类
    modules:{
        menu,role,user,cate,specs,goods,member,banner,seck
    }
})

export default store