<template>
  <div class="login-container">
    <div class="login-box">
      <h3>小U商城后台管理系统</h3>
      <el-form
        :model="loginInfo"
        :rules="rules"
        ref="loginInfo"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <el-input
            type="text"
            placeholder="请输入用户名"
            v-model="loginInfo.username"
            autocomplete="off"
          >
            <template slot="prepend"
              ><i class="el-icon-user-solid"></i
            ></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            show-password
            type="password"
            placeholder="请输入密码"
            v-model="loginInfo.password"
            autocomplete="off"
          >
            <template slot="prepend"><i class="el-icon-lock"></i></template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" @click="submitForm()"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// 导入  解构方法
import { userLogin } from "../request/user";

export default {
  data() {
    return {
      loginInfo: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs.loginInfo.validate((valid) => {
        if (valid) {
          userLogin(this.loginInfo).then((res) => {
            if (res.code == 200) {
              //  登录成功后三件事
              // 1、把登录接收到的信息存储到localStorage
              localStorage.setItem("userInfo", JSON.stringify(res.list));

              // 2、弹出登录成功的消息
              this.$message({
                message: res.msg,
                type: "success",
              });

              // 3、跳转到Layout页面
                this.$router.push('/')
            } else {
              this.$message({
                message: res.msg,
                type: "error",
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>


<style scoped>
.login-container {
  width: 100%;
  height: 100vh;
  background: url(../assets/imgs/loginbg.jpg);
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-box {
  width: 400px;
  height: 300px;
  background: #fff;
  border-radius: 5px;
  padding: 0 30px;
}
.login-box h3 {
  text-align: center;
  color: #409eff;
  margin: 40px 0;
}
.login-btn {
  width: 100%;
}
</style>