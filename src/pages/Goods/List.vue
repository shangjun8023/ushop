<template>
    <div>
    <!-- :data="goodsList"   当前表格的数据 -->
    <!-- default-expand-all   默认展开所有行-->
    <el-table
      :data="goodsList"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
    >
      <el-table-column prop="id" label="id"> </el-table-column>
      <el-table-column prop="firstcatename" label="一级分类"> </el-table-column>
      <el-table-column prop="secondcatename" label="二级分类"> </el-table-column>
      <el-table-column prop="goodsname" label="商品名称"> </el-table-column>
      <el-table-column prop="img" label="商品图片">
        <template slot-scope="scope">
          <img :src="$imgBaseUrl+scope.row.img" class="img" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="price" label="零售价格">
        <template slot-scope="scope">
          &yen;{{scope.row.price}}
        </template>
      </el-table-column>
      <el-table-column prop="market_price" label="市场价格">
        <template slot-scope="scope">
          &yen;{{scope.row.market_price}}
        </template>
      </el-table-column>
      <el-table-column prop="isnew" label="是否新品"></el-table-column>
      <el-table-column prop="ishot" label="是否热卖"></el-table-column>
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

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[2,10, 20, 30, 40]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="goodsTotal">
    </el-pagination>
  </div>
</template>

<script>
// 辅助函数  拿到goodsList的数据
import {mapState,mapActions} from 'vuex'
import {delGoods} from '../../request/goods'

export default {
  props:['info','params'],
  data() {
    return {};
  },
  computed:{
    // 1、拿到goodsList里面的数据，此时是空的
    ...mapState({goodsList:state=>state.goods.goodsList}),
    // 获取管理员数据总条数
    ...mapState({goodsTotal:state=>state.goods.goodsTotal})
  },
  created() {
    // 3、在生命周期中再次调用用来触发goods.js中的axios请求后台数据
    this.getGoodsListAction(this.params)
  },
  methods: {
    // 2、通过getGoodsListAction()方法来获取数据
    ...mapActions('goods',['getGoodsListAction']),
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
          delGoods(id).then((res) => {
            // 删除操作
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: res.msg,
              });
              // 刷新列表
              this.getGoodsListAction(this.params);
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
        this.getGoodsListAction(this.params)
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.params.page = val
        this.getGoodsListAction(this.params)
      }
  },
  components: {},
};
</script>
<style scoped>
.img{
  width: 100px;
}
</style>