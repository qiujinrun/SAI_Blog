<template>
  <section style="
      background-color: #00ff;
      width: 70%;
      height: 40%;

      background-color: #00000060;
      margin: auto;
      margin-top: 10%;
      text-align: center;
      border-radius: 10px;
      padding: 50px 50px;
    ">
    <el-container>
      <el-form :model="User" style="width: 100%; height: 100%; padding-left: 15%; padding-top: 15%">
        <el-form-item prop="account">
          <el-input v-model="User.account" placeholder="请输入账号" style="width: 80%; padding: 0" size="large"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input type="password" v-model="User.password" style="width: 80%; padding: 0" size="large"
            placeholder="请输入密码" show-password></el-input>
        </el-form-item>
      </el-form>
    </el-container>
    <div class="dialog-footer" style="margin-top: 5px">
      <el-button type="primary" @click="login" style="margin-right: 40px; width: 100px; height: 40px">登 录</el-button>
      <div style="margin-top: 5%; text-align: center">
        <span style="color: #bbb9b9">登录视为您已同意第三方账号绑定协议、服务条款、隐私政策</span>
      </div>
    </div>
  </section>
</template>
<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { userlogin } from '@/api/Login'
import { ElMessage } from 'element-plus'
const router = useRouter()
let User = reactive({ account: '', password: '', })
const login = async () => {
  try {
    let res = await userlogin(User);
    console.log(res);
    if (res && res.status_code === 1) {
      console.log("登录成功", res);
      ElMessage.success(res.status_msg);
      localStorage.setItem('token', res.token)
      router.push('/home')
    }else if (res && res.status_code === 0) {
      ElMessage.error(res.status_msg);
    } else {
      console.log("注册失败", res);
      ElMessage.error('登录失败');
    }
  } catch (error) {
    console.error("登录请求错误:", error);
    ElMessage.error('登录请求失败，请稍后再试');
  }
}
</script>
<style scoped lang="">

</style>