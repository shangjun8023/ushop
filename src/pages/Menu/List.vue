<template>
  <div>
    <!-- :data="menuList"   当前表格的数据 -->
    <!-- default-expand-all   默认展开所有行-->
    <el-table
      :data="menuList"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="序号"> </el-table-column>
      <el-table-column prop="title" label="菜单名称"> </el-table-column>
      <el-table-column prop="icon" label="图标">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="地址"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.status == 1">正常</el-tag>
          <el-tag type="danger" v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click="edit(scope.row)"
            type="success"
            size="small"
            icon="el-icon-edit"
            circle
          ></el-button>
          <el-button
            @click="del(scope.row.id)"
            type="danger"
            size="small"
            icon="el-icon-delete"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// 辅助函数
import { mapActions, mapState } from "vuex";
import { delMenu } from "../../request/menu";

export default {
  props: ["info"],
  data() {
    return {
      
    };
  },
  created() {
    //   获取后台数据的调用方法
    this.getMenuListAction();
  },
  computed: {
    ...mapState({ menuList: (state) => state.menu.menuList }),
  },
  methods: {
    ...mapActions("menu", ["getMenuListAction"]),
    // 编辑
    edit(row) {
      // 1、显示弹框
      this.info.isShow = true;
      this.info.isAdd = false;
      // 2、把数据传递到父组件index,再通过父组件index的ref触发给Model弹框
      this.$emit("setFromInfo", row);
    },
    // 删除
    del(id) {
      this.$confirm("此操作将永久删除该列表, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delMenu(id).then((res) => {
            // 删除操作
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: res.msg,
              });
              // 刷新列表
              this.getMenuListAction();
            } else {
              this.$message({
                type: "error",
                message: res.msg,
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  components: {},
};
</script>
<style scoped>
</style>