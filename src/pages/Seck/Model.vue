<template>
    <el-dialog
    @close='reset'
    :title="info.isAdd ? '新增' : '编辑'"
    :visible.sync="info.isShow"
  >
    <el-form
      :model="formInfo"
      label-width="120px"
      ref="formInfo"
      :rules="rules"
    >

      <el-form-item label="角色名称" prop="seckname">
        <el-input v-model="formInfo.seckname" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="角色权限" prop="menus">
        <el-tree
          :data="menuList"
          show-checkbox
          default-expand-all
          node-key="id"
          ref="tree"
          highlight-current
          :props="defaultProps">
        </el-tree>

      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="formInfo.status">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="2">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="info.isShow = false">取 消</el-button>
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 获取菜单列表 用vuex  解构
import {mapState,mapActions} from 'vuex'
// 导入新增方法
import {addSeck,editSeck} from '../../request/seck'


export default {
  props:['info'],
  data() {
    return {
      formInfo:{
        title:"",
        begintime:"",
        endtime:"",
        first_cateid:"",
        second_cateid:"",
        goodsid:"",
        status:1
      },
      // 前面加星号，表示必填项
      rules: {
        seckname: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
      },
        defaultProps: {
          // 指定子树为节点对象的某个属性值
          children: 'children',
          // 指定节点标签为节点对象的某个属性值
          label: 'title'
        }
    };
  },
  computed:{
    ...mapState({menuList:state=>state.menu.menuList})
  },
  created() {
    this.getMenuListAction()
  },
  methods: {
    ...mapActions('menu',['getMenuListAction']),
    ...mapActions('seck',['getSeckListAction']),
    submit(){
      // 判断
      this.$refs.formInfo.validate((valid) => {
        if (valid) {
          // 获取树形控件被选中的id   单独获取
          this.formInfo.menus=this.$refs.tree.getCheckedKeys().join(',')
          // console.log(this.formInfo.menus);
          if(this.info.isAdd){
            //--------新增-------------
          addSeck(this.formInfo).then((res)=>{
            if(res.code==200){
              // 1、弹出成功的提示
               this.$message({
                  message: res.msg,
                  type: "success",
                });
              // 2、刷新列表  调用
              this.getSeckListAction()
              //   3、关闭对话框
              this.info.isShow = false;
            }else{
              // 1、弹出失败提示
              this.$message({
                  message: res.msg,
                  type: "error",
                });
            }
          })
          }else{
            //--------编辑------------
            editSeck(this.formInfo).then((res)=>{
              if(res.code==200){
                // 1、弹出成功的提示
                this.$message({
                    message: res.msg,
                    type: "success",
                  });
                // 2、刷新列表  调用
                this.getSeckListAction()
                //   3、关闭对话框
                this.info.isShow = false;
              }else{
                // 1、弹出失败提示
                this.$message({
                    message: res.msg,
                    type: "error",
                  });
              }
            })
          }
        } else {
          return false;
        }
      });
    },
    // 4、关闭对话框后清空对话框内数据
    reset(){
      this.formInfo={
          title:"",
          begintime:"",
          endtime:"",
          first_cateid:"",
          second_cateid:"",
          goodsid:"",
          status:1
      };
      // 单独清空
       this.$refs.tree.setCheckedKeys([]);
    },
    setFromInfo(obj){
      this.formInfo = {...obj}
      // 单独设置
      // 在nextTick 在dom渲染完成后，执行内容的代码
      this.$nextTick(()=>{
        this.$refs.tree.setCheckedKeys(this.formInfo.menus.split(','))
      })
    }
  },
  components: {},
};
</script>
<style scoped>
</style>