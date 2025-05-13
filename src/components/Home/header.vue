<template>
  <el-row :gutter="24" class="main">
    <el-col :span="1">
      <div class="grid-content ep-bg-purple" />
    </el-col>
    <el-col :span="18" >
      <!-- 遍历菜单 -->
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        :router="true"
      >
        <el-menu-item>
          <p class="img-caption">SAI_BLOG</p>
        </el-menu-item>
        <template v-for="item in Menudata.menu" :key="item.index">
          <el-menu-item :index="item.index">
            {{ item.label }}
          </el-menu-item>
        </template>
      </el-menu>
    </el-col>
    <el-col :span="4" class="button">
      <el-button
        v-if="!isEditorPage"
        type="success"
        @click="editor"
      >
        撰写博客
      </el-button>
      <div class="demo-basic--circle">
        <!-- <div class="block">
          <el-avatar
            :size="50"
            src="https://th.bing.com/th/id/OIP.7KH4CcveY3sV0Bv_zPyJVgAAAA?rs=1&pid=ImgDetMain"
          />
        </div> -->
        <el-dropdown>
          <span class="el-dropdown-link">
            <div class="block">
              <el-avatar 
                :size="50"
                :src="avater_url"
              />
            </div>
          </span>
          <template #dropdown>
            <el-dropdown-menu class="el-dropdown-menu">
              <el-dropdown-item >你好，{{ userStore.userInfo.name }}</el-dropdown-item>
              <el-dropdown-item @click="gotoBlog"  divided>我的博客</el-dropdown-item>
              <el-dropdown-item @click="gotoSetting">个人设置</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-col>
    <el-col :span="1">
      <!-- <div class="grid-content ep-bg-purple" /> -->
      <el-button link @click="goToLogin">退出登录 </el-button>
    </el-col>
  </el-row>
</template>
  
<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
const userStore = useUserStore()
const avater_url = userStore.userInfo.ico_url
const route = useRoute()
const activeIndex = ref<string>(route.path)

// 跳转到博客
const gotoBlog = () => {
  router.push('/self/blog')
}
// 跳转到设置
const gotoSetting = () => {
  router.push('/self/information') 
}
// 退出登录
const router = useRouter()
const goToLogin = () => {
  router.push('/login')
}
// // 路由监听
watch(route, (newRoute) => {
  activeIndex.value = newRoute.path
})
interface MenuItem {
  index: string
  label: string
}
interface PageData {
  menu: MenuItem[]
}
defineProps<{
  Menudata: PageData
}>()
const isEditorPage = ref(route.path === '/editor')

// 监听路由变化，实时更新
watch(
() => route.path,
(newPath) => {
  isEditorPage.value = newPath === '/editor'
}
)
// 写博客
const editor = () => {
  router.push('/editor')
}
</script>

<style scoped lang="scss">
@use 'element-plus/theme-chalk/src/common/var.scss' as *;
.main {
  background-color: #ffffff;
  // border-bottom: solid 1px var(--el-menu-border-color);
  margin: 0 !important;
  position: fixed;
  //为了显示在页面的顶部
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999; // 确保在上层
  background-color: #ffffff;
  border-bottom: solid 1px var(--el-menu-border-color);
  margin: 0 !important;
  padding: 0 20px;
  .button{
   display: flex;
   align-items: center;
   justify-content: center;
  }
}
// .el-menu--horizontal > .el-menu-item:nth-child(2) {
//   margin-right: auto;
// }
.img-caption {
  margin: 0;
  font-size: 25px;
  background: linear-gradient(
    to right,
    var(--el-color-primary),
    var(--el-color-primary)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: 'Lobster', cursive;
}

.el-col-2,
.el-col-2.is-guttered,
.el-col-1,
.el-col-1.is-guttered {
  display: flex;
  align-items: center;
  justify-content: center;
}

.demo-basic--circle {
  margin-left: 20px;
  width: 40px;
  justify-content: center;
}
.el-sub-menu .el-sub-menu__icon-arrow {
  top: 0;
  margin-top: 0;
}
/* 穿透样式作用域 */
:v-deep(.el-dropdown-menu) {
  font-size: 22px;   // 修改字体大小
  min-width: 160px;  // 修改最小宽度（默认是 150px）
  padding: 10px 0;   // 调整上下内边距
}

:v-deep(.el-dropdown-menu__item) {
  padding: 10px 20px; // 修改每一项的内边距
}
</style>
