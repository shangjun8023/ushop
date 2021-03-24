<template>
    <div>
    <!-- :data="userList"   当前表格的数据 -->
    <!-- default-expand-all   默认展开所有行-->
    <el-table
      :data="userList"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
    >
      <el-table-column prop="id" label="ID"> </el-table-column>
      <el-table-column prop="username" label="角色名称"> </el-table-column>
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
            @click="del(scope.row.uid)"
            type="danger"
            size="small"
            icon="el-icon-delete"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[2,10, 20, 30, 40]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="userTotal">
    </el-pagination>
  </div>
</template>

<script>
// 辅助函数  拿到userList的数据
import {mapState,mapActions} from 'vuex'
import {delUser} from '../../request/user'

export default {
  props:['info','params'],
  data() {
    return {};
  },
  computed:{
    // 1、拿到userList里面的数据，此时是空的
    ...mapState({userList:state=>state.user.userList}),
    // 获取管理员数据总条数
    ...mapState({userTotal:state=>state.user.userTotal})
  },
  created() {
    // 3、在生命周期中再次调用用来触发user.js中的axios请求后台数据
    this.getUserListAction(this.params)
  },
  methods: {
    // 2、通过getUserListAction()方法来获取数据
    ...mapActions('user',['getUserListAction']),
    // 编辑
    edit(row){
      // 1、显示弹框
      this.info.isShow = true;
      this.info.isAdd = false;
      // 2、把数据传递到父组件index,再通过父组件index的ref触发给Model弹框
      this.$emit("setFromInfo", row);
    },

    // 删除
      del(uid) {
      this.$confirm("此操作将永久删除该列表, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delUser(uid).then((res) => {
            // 删除操作
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: res.msg,
              });
              // 刷新列表
              this.getUserListAction(this.params);
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

    // 分页操作相关方法
     handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.params.size = val
        // 防止总数据不够，一页展示时报错
        this.params.page = 1
        this.getUserListAction(this.params)
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.params.page = val
        this.getUserListAction(this.params)
      }
  },
  components: {},
};
</script>
<style scoped>
</style>