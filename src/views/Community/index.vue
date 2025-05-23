<template lang="">
    <Header :Menudata="Menudata" />
    <div class="main-container">
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Header from '@/components/Home/header.vue'
const Menudata = ref({
  // title: '首页',
  menu: [
    { index: '/home', label: '首页' },
    { index: '', label: '聊天室' },
  ]

})
</script>
<style scoped lang="scss">
.main-container {
    background-color: white; /* 背景颜色 */
    padding: 20px; /* 内边距 */
    border-radius: 10px; /* 圆角 */ 
    margin-top: 50px;
}
</style>