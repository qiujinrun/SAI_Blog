<template lang="">
    <Header :Menudata="Menudata" />
    <el-form-item label="修改密码">
      <el-input v-model="new_password" />
    </el-form-item>
    <el-button type="primary" @click="toResetPassword">提交</el-button>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import Header from '@/components/Home/header.vue'
void Header
import { ElMessage } from 'element-plus'
import { resetPassword } from '@/api/Self/index'
const route = useRoute()
const token = route.query.token as string
const Menudata = ref({
    // title: '首页',
    menu: [
  //   {  label: '首页' }
      { index: '/home', label: '首页' },
      { index: '',label: '修改密码'}
    ]
  })
void Menudata
const new_password = ref('')
const toResetPassword = async () => {
    const res = await resetPassword(new_password.value)
    if (res.status_code === 1) {
        ElMessage.success(res.status_msg)
    } else {
        ElMessage.error(res.status_msg)
    }
}
void toResetPassword
console.log('token from email:', token)
</script>
<style lang="">
    
</style>