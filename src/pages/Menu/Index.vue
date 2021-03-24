<template>
  <el-card>
    <!-- 新增按钮 -->
    <el-button
      @click="showModel"
      type="primary"
      icon="el-icon-circle-plus-outline"
      >新增</el-button
    >
    <!-- 分割线 -->
    <el-divider></el-divider>
    <!-- 表格 -->
    <List :info="info" @setFromInfo="setFromInfo" />
    <!-- model对话框 -->
    <!-- 组件传值  组件通信  父传子，子用props接收自定义属性 -->
    <Model :info="info" ref="model" />
  </el-card>
</template>

<script>
// 导入组件
import List from "./List";
import Model from "./Model";

export default {
  data() {
    return {
      info: {
        // 控制对话框显示或隐藏   false 隐藏   true  显示
        isShow: false,
        // 控制是添加还是编辑  false 代表编辑  true代表添加
        isAdd: true,
      },
    };
  },
  created() {},
  methods: {
    showModel() {
      this.info.isShow = true;
      this.info.isAdd = true;
    },
    // 把数据传递给Model,通过ref调用Model下的方法
    setFromInfo(obj) {
      this.$refs.model.setFromInfo(obj);
    },
  },
  components: {
    List,
    Model,
  },
};
</script>
<style scoped>
</style>