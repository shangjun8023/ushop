<template>
    <div>
    <!-- :data="roleList"   当前表格的数据 -->
    <!-- default-expand-all   默认展开所有行-->
    <el-table
      :data="roleList"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
    >
      <el-table-column prop="id" label="ID"> </el-table-column>
      <el-table-column prop="rolename" label="角色名称"> </el-table-column>
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
// 辅助函数  拿到roleList的数据
import {mapState,mapActions} from 'vuex'
import {delRole} from '../../request/role'

export default {
  props:['info'],
  data() {
    return {};
  },
  computed:{
    // 1、拿到roleList里面的数据，此时是空的
    ...mapState({roleList:state=>state.role.roleList})
  },
  created() {
    // 3、在生命周期中再次调用用来触发role.js中的axios请求后台数据
    this.getRoleListAction()
  },
  methods: {
    // 2、通过getRoleListAction()方法来获取数据
    ...mapActions('role',['getRoleListAction']),
    // 编辑
    edit(row){
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
          delRole(id).then((res) => {
            // 删除操作
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: res.msg,
              });
              // 刷新列表
              this.getRoleListAction();
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