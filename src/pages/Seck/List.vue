<template>
  <div>
    <!-- :data="seckList"   当前表格的数据 -->
    <!-- default-expand-all   默认展开所有行-->
    <el-table
      :data="seckList"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
    >
      <el-table-column prop="id" label="ID"> </el-table-column>

      <el-table-column prop="title" label="标题"> </el-table-column>

      <el-table-column prop="begintime" label="开始时间">
        <template slot-scope="scope">
          {{scope.row.begintime|timeFiter}}
        </template>
      </el-table-column>

      <el-table-column prop="endtime" label="结束时间">
        <template slot-scope="scope">
          {{scope.row.endtime|timeFiter}}
        </template>
      </el-table-column>

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
import { number } from 'echarts';
// 辅助函数  拿到seckList的数据
import { mapState, mapActions } from "vuex";
import { delSeck } from "../../request/seck";

export default {
  props: ["info"],
  data() {
    return {};
  },
  computed: {
    // 1、拿到seckList里面的数据，此时是空的
    ...mapState({ seckList: (state) => state.seck.seckList }),
  },
  created() {
    // 3、在生命周期中再次调用用来触发seck.js中的axios请求后台数据
    this.getSeckListAction();
  },
  methods: {
    // 2、通过getSeckListAction()方法来获取数据
    ...mapActions("seck", ["getSeckListAction"]),
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
  filters: {
    timeFiter(value) {
      let time = new Date(Number(value))
      return time.toLocaleDateString()
    },
  },
};
</script>
<style scoped>
</style>