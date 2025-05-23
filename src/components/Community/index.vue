<template lang="">
    <div class="big-container">
        <router-link :to="'/community/detail/'">
            <div class="main-container">
                <div class="title">
                    {{Menudata.menu[0].label}}
                </div>
            </div>
        </router-link> 
    </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'

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
</script>
<style scoped lang="scss">
    .big-container {

        .main-container {
        background-color: white; /* 背景颜色 */
        padding: 20px; /* 内边距 */
        border-radius: 10px; /* 圆角 */ 
        // width: 800px;
        height: 100px;
        margin-top: 20px;
        margin-left: 0px;
        border: 1px solid #ccc; /* 边框 */;

        .title {
            font-size: 20px; /* 字体大小 */
            font-weight: bold; /* 字体粗细 */
            margin-left: 10px;
        }
    }
    }
    
</style>