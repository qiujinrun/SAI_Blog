<template>
  <div>
    <!-- 固定在顶部的 Header -->
    <Header :Menudata="Menudata" />
    <!-- 主布局区域 -->
    <div class="common-layout">

      <el-container>
        <!-- 固定在左侧的菜单栏 -->
        <el-aside class="fixed-aside">
          <h5 class="aside-title">菜单栏</h5>
          <el-menu
            class="el-menu-vertical-demo"
            :default-active="$route.path"
            @select="handleSelect"
            router
          >
            <el-menu-item index="/home/blog">博客论坛</el-menu-item>
            <el-menu-item index="/home/subscribe">关注订阅</el-menu-item>
          </el-menu>
        </el-aside>

        <!-- 右侧内容区域 -->
        <el-main class="main-content">
          <router-view />
        </el-main>
      </el-container>
    </div>
  </div>
</template>
<script setup>
import Header from '@/components/Home/header.vue'
import { ref } from 'vue'

const Menudata = ref({
  // title: '首页',
  menu: [
//   {  label: '首页' }
    { index: '/home', label: '首页' },
  ]
})
import { useRouter } from 'vue-router'
const router = useRouter()
// const route = useRoute()
function handleSelect(index) {
  router.push(index)
}
</script>
<style scoped lang="scss">
.fixed-aside {
  position: fixed;
  top: 64px; // 跟 Header 高度一致
  left: 0;
  width: 200px;
  height: calc(100vh - 64px);
  background: #fff;
  border-right: 1px solid #eee;
  z-index: 100;
  padding-top: 10px;
}
.common-layout {
  .aside-title {
    font-size: 18px;
    font-weight: bold;
    margin: 16px;
    text-align: center;
  }
  .el-menu {
    border-right: none; // 去掉菜单右边的线条
    span{
      margin-left: 10px;
    }
  .el-menu-item {
      margin-left: 10px;
    }
  }
}
.main-content{
  padding-top: 60px;
  margin-left: 180px;
}
.tac{
  .el-col {
      width: 180px;
      min-width: 180px;
      max-width: 240px;
      }
  .mb-2{
    font-size: 18px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
}
.el-sub-menu .el-sub-menu__icon-arrow{
  margin-top: 20px;
}
</style>