
<template>
    <div class="auth-container">
      <!-- 顶部 Logo + 文案 -->
      <div class="auth-header">
        <!-- <img src="@/assets/logo.png" alt="logo" class="logo" /> -->
        <h2>与专业的创作者进行深度的互动交流</h2>
      </div>
  
      <!-- 中间扫码/验证码/APP 三种方式（这里只示意，不做路由切）-->
      <el-tabs v-model="mode" class="mode-tabs">
        <el-tab-pane label="登录" name="login"><login/></el-tab-pane>
        <el-tab-pane label="注册" name="register"><register/></el-tab-pane>
        <!-- <el-tab-pane label="APP登录" name="app">APP 登录提示</el-tab-pane> -->
      </el-tabs>
  
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import login from '@/components/Login/login/index.vue'
  import register from '@/components/Login/register/index.vue'
  const router = useRouter()
  const route = useRoute()
  
  // 用于顶部三种模式切换（可根据需求完善）
  const mode = ref<'login'|'register'>('login')
  
  // 用于底部登录/注册 tab
//   const tab = ref<'login'|'register'>(route.path.endsWith('register') ? 'register' : 'login')
  
  // 监听 tab 变化，切换路由
  function onTabClick(tabPane: any) {
    router.push(`/Login/${tabPane.name}`)
  }
  
  // Keep tab in sync when URL changes
  watch(() => route.path, p => {
    tab.value = p.endsWith('register') ? 'register' : 'login'
  })
  </script>
  
  <style scoped>
  .auth-container {
    width: 500px;
    margin: 80px auto;
    padding: 24px;
    background: rgba(0,0,0,0.04);
    border-radius: 8px;
  }
  .auth-header {
    text-align: center;
    margin-bottom: 16px;
  }
  .auth-header .logo {
    width: 48px;
    margin-bottom: 8px;
  }
  .mode-tabs {
    margin-bottom: 16px;
  }
  .auth-tabs {
    margin-bottom: 24px;
  }
  </style>
  