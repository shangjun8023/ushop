<template>
  <!-- 3、全屏预览   用fullscreen包住所有内容  -->
  <fullscreen ref="fullscreen">
      <el-container>
    <!-- 左侧导航 -->
    <el-aside :width="isCollapse?'60px':'260px'">
      <h3 class="logo">小U商城后台</h3>
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        background-color="#333"
        text-color="#fff"
        active-text-color="#fff"
        unique-opened
        :collapse='isCollapse'
        :collapse-transition='false'
        router
      >
        <!-- 管理中心 -->
        <el-menu-item index="/home">
          <i class="el-icon-menu"></i>
          <span slot="title">管理中心</span>
        </el-menu-item>

        <!-- 动态渲染路由 -->
         <!-- 系统设置 -->
        <div v-for="(item,index) in menus" :key="item.id">
          <!-- 有下拉菜单的 -->
          <el-submenu :index="String(index)" v-if="item.type==1">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item v-for="a in item.children" :key="a.id" :index="a.url">
              <span slot="title">{{a.title}}</span>
            </el-menu-item>
          </el-submenu>

          <!-- 没有下拉 直接点击 -->
          <el-menu-item :index="item.url" v-else>
          <i :class="item.icon"></i>
          <span slot="title">{{item.title}}</span>
          </el-menu-item>
        </div>

      <!-- 普通渲染 -->
        <!-- 系统设置 -->
          <!-- <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>系统设置</span>
            </template>
            <el-menu-item index="/menu">
              <span slot="title">菜单管理</span>
            </el-menu-item>
            <el-menu-item index="/role">
              <span slot="title">角色管理</span>
            </el-menu-item>
            <el-menu-item index="/user">
              <span slot="title">管理员管理</span>
            </el-menu-item>
          </el-submenu> -->

        <!-- 商城管理 -->
        <!-- <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-s-goods"></i>
            <span>商城管理</span>
          </template>
          <el-menu-item index="/cate">
            <span slot="title">商品分类</span>
          </el-menu-item>
          <el-menu-item index="/specs">
            <span slot="title">商品规格</span>
          </el-menu-item>
          <el-menu-item index="2-3">
            <span slot="title">商品管理</span>
          </el-menu-item>
          <el-menu-item index="2-4">
            <span slot="title">会员管理</span>
          </el-menu-item>
          <el-menu-item index="2-5">
            <span slot="title">轮播图管理</span>
          </el-menu-item>
          <el-menu-item index="2-6">
            <span slot="title">秒杀活动</span>
          </el-menu-item>
        </el-submenu> -->
      </el-menu>
    </el-aside>
    <!-- 右侧整体 -->
    <el-container>
      <!-- 头部 -->
      <el-header>
          <!-- 左侧按钮 -->
        <div class="left">
          <el-button class="btn" @click="isCollapse=!isCollapse" type="primary" icon="el-icon-s-fold" size="mini"></el-button>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">管理中心</el-breadcrumb-item>
            <!-- {{this.$route.meta.title}} 当前所在的菜单选项 -->
            <el-breadcrumb-item><a href="/">{{this.$route.meta.title}}</a></el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!-- 右侧 -->
        <div class="right">
          <el-dropdown>
            <span class="el-dropdown-link">
              {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a"><i class="el-icon-user"></i>个人信息</el-dropdown-item>
              <!-- 4、全屏预览   在全屏预览的地方加上点击事件 -->
              <div @click="fullscreen">
                <el-dropdown-item command="b"><i class="el-icon-full-screen"></i>全屏预览</el-dropdown-item>
              </div>
              <div @click="quit">
                <el-dropdown-item command="c" ><i class="
el-icon-switch-button"></i>安全退出</el-dropdown-item>
              </div>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <!-- 右侧下方内容区 -->
      <el-main>
          <!-- 二级路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
      </el-container>
  </fullscreen>
</template>

<script>
// 1、全屏预览   导入
import Vue from 'vue'
import fullscreen from 'vue-fullscreen'

// 2、全屏预览   注册
Vue.use(fullscreen)


export default {
  data() {
    return {
        isCollapse:false,
        menus:[],
        username:''
    };
  },
  created() {
    let userInfo = JSON.parse(localStorage.getItem('userInfo')||'{}')
    // console.log(userInfo);
    this.menus = userInfo.menus
    this.username = userInfo.username
  },
  methods: {
    quit(){
      // 1、清空localStorage
      localStorage.removeItem('userInfo')
      // 2、弹出退出成功提示
      this.$message({
                type: "success",
                message: '退出成功',
              });
      // 3、跳转到登录页面
      this.$router.push('/login')
    },
    // 5、全屏预览   设置 全屏显示方法
    fullscreen(){
      this.$refs.fullscreen.toggle();
    }
  },
  components: {},
};
</script>


<style scoped>
.el-container {
  width: 100%;
  height: 100vh;
}
.el-header {
  background-color: #fff;
  color: #333;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 5px #333;
  z-index: 1;
}

.el-aside {
  background-color: #333;
  color: #fff;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}
.logo {
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-weight: 400;
  letter-spacing: 4px;
  background-color: #555;
}
/* 当前激活菜单的背景颜色 */
.is-active {
  background-color: rgb(240, 126, 20) !important;
}
/* 收缩后的  当前激活菜单的背景颜色 */
.el-menu-item:hover{
    background-color: rgb(16, 176, 250) !important;
}
.el-menu {
  border: none;
}

/* 头部样式 */
 .el-dropdown-link {
    cursor: pointer;
    color: #333;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
.left{
    display: flex;
    align-items: center;
}
/* 头部按钮 */
.btn{
    margin-right: 10px;
}
</style>