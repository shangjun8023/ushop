<template>
  <el-dialog
    @close="reset"
    :title="info.isAdd ? '新增' : '编辑'"
    :visible.sync="info.isShow"
  >
    <el-tabs v-model="activeName">
      <el-tab-pane label="用户管理" name="first">
        <el-form
          :model="formInfo"
          label-width="80px"
          ref="formInfo"
          :rules="rules"
        >
          <el-form-item label="一级分类" prop="first_cateid">
            <el-select
              v-model="formInfo.first_cateid"
              placeholder="请选择一级分类"
              @change="firstCateChange"
            >
              <el-option
                v-for="item in cateList"
                :key="item.id"
                :label="item.catename"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="二级分类" prop="second_cateid">
            <el-select
              v-model="formInfo.second_cateid"
              placeholder="请选择二级分类"
            >
              <el-option
                v-for="item in second_cateList"
                :key="item.id"
                :label="item.catename"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="商品名称" prop="goodsname">
            <el-input
              v-model="formInfo.goodsname"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item label="商品图片" prop="img">
            <el-upload
              class="avatar-uploader"
              action=""
              :auto-upload="false"
              :show-file-list="false"
              :on-change="change"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="商品价格" prop="price">
            <el-input
              v-model="formInfo.price"
              autocomplete="off"
              placeholder="请输入商品价格"
            ></el-input>
          </el-form-item>

          <el-form-item label="市场价格" prop="market_price">
            <el-input
              v-model="formInfo.market_price"
              autocomplete="off"
              placeholder="请输入市场价格"
            ></el-input>
          </el-form-item>

          <el-form-item label="商品规格" prop="specsid">
            <el-select
              v-model="formInfo.specsid"
              placeholder="请选择商品规格"
              @change="firstSpecsid"
            >
              <el-option
                v-for="item in specsAllList"
                :key="item.id"
                :label="item.specsname"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="规格属性" prop="specsattr">
            <el-select
              v-model="formInfo.specsattr"
              placeholder="请选择规格属性值"
            >
              <el-option
                v-for="(item, index) in specsSecondList"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="是否新品" prop="isnew">
            <el-radio-group v-model="formInfo.isnew">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="是否热卖" prop="ishot">
            <el-radio-group v-model="formInfo.ishot">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="formInfo.status">
              <el-radio :label="1">正常</el-radio>
              <el-radio :label="2">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="配置管理" name="second">
        <!-- 富文本编辑器 -->
        <vueWangeditor
          id="editor"
          ref="editor"
          style="width: 100%;height:300px;margin-bottom:200px"
        ></vueWangeditor>
      </el-tab-pane>
    </el-tabs>

    <div slot="footer" class="dialog-footer">
      <el-button @click="info.isShow = false">取消</el-button>
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 1、下载并导入 vue-wangeditor
import vueWangeditor from "vue-wangeditor";

// 获取菜单列表 用vuex  解构
import { mapState, mapActions } from "vuex";
// 导入新增方法
import { addGoods, editGoods } from "../../request/goods";

export default {
  props: ["info", "params"],
  data() {
    return {
      formInfo: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: "",
        description: "",
        specsid: "",
        specsattr: "",
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      // 二级分类的list
      second_cateList: [],

      // 规格属性值的list
      specsSecondList: [],

      // 前面加星号，表示必填项
      rules: {
        goodsname: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
        ],
        first_cateid: [
          { required: true, message: "请选择一级分类", trigger: "blur" },
        ],
        second_cateid: [
          { required: true, message: "请选择二级分类", trigger: "blur" },
        ],
        price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
        market_price: [
          { required: true, message: "请输入市场价格", trigger: "blur" },
        ],
        specsid: [{ required: true, message: "请选择", trigger: "blur" }],
        specsattr: [{ required: true, message: "请选择", trigger: "blur" }],
        isnew: [{ required: true, message: "请输入市场价格", trigger: "blur" }],
        ishot: [{ required: true, message: "请输入市场价格", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
      },
      imageUrl: "",
      activeName: "first",
    };
  },
  computed: {
    ...mapState({
      cateList: (state) => state.cate.cateList,
      specsAllList: (state) => state.specs.specsAllList,
    }),
  },
  created() {
    // 调用方法，请求商品分类列表数据
    this.getCateListAction();
    // 调用方法，获取规格总数列表数据
    this.getSpecsTotalAction();
  },
  methods: {
    ...mapActions("goods", ["getGoodsListAction"]),
    ...mapActions("cate", ["getCateListAction"]),
    ...mapActions("specs", ["getSpecsTotalAction"]),

    submit() {
      // 判断
      this.$refs.formInfo.validate((valid) => {
        if (valid) {
          // 单独获取富文本编辑器内容
          this.formInfo.description = this.$refs.editor.getHtml()

          // 提交之前 清除不需要的字段firstcatname和secondcatename
          this.$delete(this.formInfo, "firstcatename");
          this.$delete(this.formInfo, "secondcatename");

          // 提交应该用formData,因为有文件上传
          let fd = new FormData();
          for (let k in this.formInfo) {
            fd.append(k, this.formInfo[k]);
          }
          if (this.info.isAdd) {
            //--------新增-------------
            addGoods(fd).then((res) => {
              if (res.code == 200) {
                // 1、弹出成功的提示
                this.$message({
                  message: res.msg,
                  type: "success",
                });
                // 2、刷新列表  调用
                this.getGoodsListAction(this.params);
                //   3、关闭对话框
                this.info.isShow = false;
              } else {
                // 1、弹出失败提示
                this.$message({
                  message: res.msg,
                  type: "error",
                });
              }
            });
          } else {
            //--------编辑------------
            editGoods(fd).then((res) => {
              if (res.code == 200) {
                // 1、弹出成功的提示
                this.$message({
                  message: res.msg,
                  type: "success",
                });
                // 2、刷新列表  调用
                this.getGoodsListAction(this.params);
                //   3、关闭对话框
                this.info.isShow = false;
              } else {
                // 1、弹出失败提示
                this.$message({
                  message: res.msg,
                  type: "error",
                });
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    // 4、关闭对话框后清空对话框内数据
    reset() {
      this.formInfo = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: "",
        description: "",
        specsid: "",
        specsattr: "",
        isnew: 1,
        ishot: 1,
        status: 1,
      };
      this.imageUrl = "";
      this.$refs.editor.setHtml()
      this.activeName = 'first'
    },
    setFromInfo(obj) {
      this.formInfo = { ...obj };
      // 延迟执行
      setTimeout(() => {
        // 单独设置富文本编辑器内容
        this.$refs.editor.setHtml(this.formInfo.description)
      }, 500);

      this.imageUrl = this.$imgBaseUrl + this.formInfo.img;
      // 1、编辑重置  根据id获取下标
      let index1 = this.cateList.findIndex(
        (item) => item.id == this.formInfo.first_cateid
      );
      // 2、编辑重置  根据下标获取当前一级分类下的children,也就是二级分类列表
      this.second_cateList = this.cateList[index1].children;

      let index2 = this.specsAllList.findIndex(
        (item) => item.id == this.formInfo.specsid
      );
      this.specsSecondList = this.specsAllList[index2].attrs;
    }, 
    // 当一级分类改变的时候 触发这个方法
    firstCateChange() {
      // 1、根据id获取下标
      let index = this.cateList.findIndex(
        (item) => item.id == this.formInfo.first_cateid
      );
      // 2、根据下标获取当前一级分类下的children,也就是二级分类列表
      this.second_cateList = this.cateList[index].children;
      // 3、清空二级分类下拉框
      this.formInfo.second_cateid = "";
    },

    // 图片上传相关方法
    change(res, file) {
      // res  上传文件的图片对象  file是上传文件的数组对象
      this.imageUrl = URL.createObjectURL(res.raw);
      this.formInfo.img = res.raw;
    },
    firstSpecsid() {
      let index = this.specsAllList.findIndex(
        (item) => item.id == this.formInfo.specsid
      );
      this.specsSecondList = this.specsAllList[index].attrs;
      this.formInfo.specsattr = "";
    },
  },
  components: {
    // 注册富文本编辑器组件
    vueWangeditor,
  },
};
</script>
<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed #8c939d;
  border-radius: 5px;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.btn {
  margin-top: 20px;
  width: 100px;
  height: 40px;
  background-color: gold;
  border-radius: 10px;
  border: none;
  font-size: 14px;
  cursor: pointer;
}
</style>