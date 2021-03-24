import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../pages/Layout.vue'
import Login from '../pages/Login.vue'

// 导入子组件
// 菜单管理
import Menu from '../pages/Menu/Index.vue' 
// 懒加载
// import Menu = ()=>import('../pages/Menu/Index.vue')

// 角色管理
import Role from '../pages/Role/Index.vue'

// 管理员管理
import User from '../pages/User/Index.vue'

// 商品分类
import Cate from '../pages/Cate/Index.vue'

// 商品规格
import Specs from '../pages/Specs/Index.vue'

// 管理中心
import Home from '../pages/Home/Index.vue'

// 商品管理
import Goods from '../pages/Goods/Index.vue'

// 会员管理
import Member from '../pages/Member/Index.vue'

// 轮播图管理
import Banner from '../pages/Banner/Index.vue'

// 秒杀活动
import Seck from '../pages/Seck/Index.vue'


Vue.use(Router)

// 解决跳转到登录页报错问题  原因是重复调用同一个路由
const VueRouterPush = Router.prototype.push
Router.prototype.push = function push (to){
  return VueRouterPush.call(this,to).catch(err=>err)
}


let router =  new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta:{
        title:'登录页面'
      }
    },
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      meta:{
        title:'布局页面'
      },
      redirect:'/home',
      children:[
        {
          path:'/home',
          name:'Home',
          component:Home,
          meta:{
            title:'管理中心'
          },
        },
        {
          path:'/menu',
          name:'Menu',
          component:Menu,
          meta:{
            title:'菜单页面'
          },
        },
        {
          path:'/role',
          name:'Role',
          component:Role,
          meta:{
            title:'角色管理'
          },
        },
        {
          path:'/user',
          name:'User',
          component:User,
          meta:{
            title:'管理员管理'
          },
        },
        {
          path:'/cate',
          name:'Cate',
          component:Cate,
          meta:{
            title:'商品分类'
          },
        },
        {
          path:'/specs',
          name:'Specs',
          component:Specs,
          meta:{
            title:'商品规格'
          },
        },
        {
          path:'/goods',
          name:'Goods',
          component:Goods,
          meta:{
            title:'商品管理'
          },
        },
        {
          path:'/member',
          name:'Member',
          component:Member,
          meta:{
            title:'会员管理'
          },
        },
        {
          path:'/banner',
          name:'Banner',
          component:Banner,
          meta:{
            title:'轮播图管理'
          },
        },
        {
          path:'/seck',
          name:'Seck',
          component:Seck,
          meta:{
            title:'秒杀活动'
          },
        },
      ]
    }
  ]
})

// 全局前置守卫
router.beforeEach((to,from,next)=>{
  // 判断如果非登录界面请求数据未携带请求头 就 返回 登录界面
  if(to.path!='/login'){
    let userInfo = JSON.parse(localStorage.getItem('userInfo')||'{}')
    if(!userInfo.token){
      return next('/login')
    }
  }
  next()
  document.title = to.meta.title
})

export default router