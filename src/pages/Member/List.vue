<template>
  <div>
    <!-- :data="memberList"   当前表格的数据 -->
    <!-- default-expand-all   默认展开所有行-->
    <el-table
      :data="memberList"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
    >
      <el-table-column prop="id" label="ID"> </el-table-column>
      <el-table-column prop="nickname" label="昵称"> </el-table-column>
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
// 辅助函数  拿到memberList的数据
import { mapState, mapActions } from "vuex";
import { delMember } from "../../request/member";

export default {
  props: ["info"],
  data() {
    return {};
  },
  computed: {
    // 1、拿到memberList里面的数据，此时是空的
    ...mapState({ memberList: (state) => state.member.memberList }),
  },
  created() {
    // 3、在生命周期中再次调用用来触发member.js中的axios请求后台数据
    this.getMemberListAction();
  },
  methods: {
    // 2、通过getMemberListAction()方法来获取数据
    ...mapActions("member", ["getMemberListAction"]),
    // 编辑
    edit(row) {
      this.$message({
        type: "success",
        message: "此功能正在建设中",
      });
    },

    // 删除
    del(id) {
      this.$confirm("此操作将永久删除该列表, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "此功能正在建设中",
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