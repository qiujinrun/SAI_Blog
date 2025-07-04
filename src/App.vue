<script setup lang="ts">

</script>
<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
body {
  margin: 0;
  display: block;
  background-color: #f7f7f7;
}
body.blog-detail {
  background-color: white !important;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
//修改下拉菜单样式
.el-dropdown-menu {
  font-size: 16px !important;
  min-width: 200px !important;
  padding: 10px 0 !important;
}

.el-dropdown-menu__item {
  font-size: 16px !important;
  padding: 12px 20px !important;
}
.el-dropdown-menu__item:hover {
  background-color: #f3f3f3!important;
  color: #42b983!important;
}
</style>
