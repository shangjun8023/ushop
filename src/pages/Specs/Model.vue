<template>
    <el-dialog
    @close='reset'
    :title="info.isAdd ? '新增' : '编辑'"
    :visible.sync="info.isShow"
  >
    <el-form
      :model="formInfo"
      label-width="80px"
      ref="formInfo"
      :rules="rules"
    >

      <el-form-item label="属性名" prop="specsname">
        <el-input v-model="formInfo.specsname" autocomplete="off" placeholder="请输入属性名"></el-input>
      </el-form-item>

      <el-form-item label="属性值" prop="attrs">
        <div class="box" v-for="(item,index) in list" :key="index">
          <el-input type="text" v-model="list[index]" autocomplete="off" placeholder="请输入属性值"></el-input>
          <el-button type="success" size="small" v-if="index==0" @click="increase">添加</el-button>
          <el-button type="danger" size="small" v-else @click="decrease(index)">删除</el-button>
        </div>
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
import {addSpecs,editSpecs} from '../../request/specs'


export default {
  props:['info','params'],
  data() {
    return {
      formInfo:{
        specsname:"",
        attrs:"",
        status:1
      },
      // 前面加星号，表示必填项
      rules: {
        specsname: [{ required: true, message: "请输入名称", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
      },
      list:['']
    };
  },
  computed:{
    ...mapState({roleList:state=>state.role.roleList})
  },
  created() {
    // this.getRoleListAction()
  },
  methods: {
    ...mapActions('specs',['getSpecsListAction']),
    submit(){
      // 判断
      this.$refs.formInfo.validate((valid) => {
        if (valid) {
          // 整理后端需要的数据，把list数组转换为逗号分割的字符串
          this.formInfo.attrs = this.list.join(',') 
          if(this.info.isAdd){
            //--------新增-------------
          addSpecs(this.formInfo).then((res)=>{
            if(res.code==200){
              // 1、弹出成功的提示
               this.$message({
                  message: res.msg,
                  type: "success",
                });
              // 2、刷新列表  调用
              this.getSpecsListAction(this.params)
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
            editSpecs(this.formInfo).then((res)=>{
              if(res.code==200){
                // 1、弹出成功的提示
                this.$message({
                    message: res.msg,
                    type: "success",
                  });
                // 2、刷新列表  调用
                this.getSpecsListAction(this.params)
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
        specsname:"",
        attrs:"",
        status:1
      };
      this.list = ['']
    },
    setFromInfo(obj){
      this.formInfo = {...obj}
      // 深拷贝
      this.list = JSON.parse(JSON.stringify(this.formInfo.attrs))
    },
    increase(){
      this.list.push('')
    },
    decrease(index){
      this.list.splice(index,1)
    }
  },
  components: {},
};
</script>
<style scoped>
.box{
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.el-button{
  margin-left: 10px;
}
</style>