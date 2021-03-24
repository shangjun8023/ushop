<template>
  <el-card>
    <!-- 新增按钮 -->
    <el-button @click="showModel" type="primary" icon="el-icon-circle-plus-outline">新增</el-button>
    <!-- 分割线 -->
    <el-divider></el-divider>
    <!-- List表格 -->
      <List :info="info" :params="params" @setFromInfo="setFromInfo"/>
    <!-- Model弹出对话框 -->
      <Model :info="info" :params="params" ref="model"/>
  </el-card>
</template>

<script>
// 导入List和Model
import List from './List'
import Model from './Model'

export default {
  data() {
    return {
      info:{
        // 控制对话框显示或隐藏   false 隐藏   true  显示
        isShow: false,
        // 控制是添加还是编辑  false 代表编辑  true代表添加
        isAdd: true,
      },
      // 分页对象
      params:{
        page:1,
        size:10
      }
    };
  },
  created() {},
  methods: {
    showModel(){
      this.info.isShow = true;
      this.info.isAdd = true;
    },
    setFromInfo(obj){
      this.$refs.model.setFromInfo(obj)
    }
  },
  components: {
    List,Model
  },
};
</script>
<style scoped>
</style>