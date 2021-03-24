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

    <el-form-item label="角色">
        <el-select v-model="formInfo.roleid" placeholder="请选择角色">
          <el-option
            v-for="item in roleList"
            :key="item.id"
            :label="item.rolename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="帐号" prop="username">
        <el-input v-model="formInfo.username" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="formInfo.password" autocomplete="off" :placeholder="info.isAdd?'请输入密码':'密码为空表示不修改'"></el-input>
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
import {addUser,editUser} from '../../request/user'


export default {
  props:['info','params'],
  data() {
    return {
      formInfo:{
        roleid:"",
        username:"",
        password:"",
        status:1
      },
      // 前面加星号，表示必填项
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
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
    ...mapState({roleList:state=>state.role.roleList})
  },
  created() {
    this.getRoleListAction()
  },
  methods: {
    ...mapActions('user',['getUserListAction']),
    ...mapActions('role',['getRoleListAction']),
    submit(){
      // 判断
      this.$refs.formInfo.validate((valid) => {
        if (valid) {
          if(this.info.isAdd){
            //--------新增-------------
          addUser(this.formInfo).then((res)=>{
            if(res.code==200){
              // 1、弹出成功的提示
               this.$message({
                  message: res.msg,
                  type: "success",
                });
              // 2、刷新列表  调用
              this.getUserListAction(this.params)
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
            editUser(this.formInfo).then((res)=>{
              if(res.code==200){
                // 1、弹出成功的提示
                this.$message({
                    message: res.msg,
                    type: "success",
                  });
                // 2、刷新列表  调用
                this.getUserListAction(this.params)
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
        roleid:"",
        username:"",
        password:"",
        status:1
      };
    },
    setFromInfo(obj){
      this.formInfo = {...obj}
      this.formInfo.password = ""
    }
  },
  components: {},
};
</script>
<style scoped>
</style>