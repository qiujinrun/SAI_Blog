<template lang="">
    <div class="container">
        <Community :Menudata="Menudata" />
    </div>
</template>
<script setup lang="ts">
import Community from "@/components/Community/index.vue";
void Community;
import {ref} from "vue";
const Menudata = ref({
  // title: '首页',
  menu: [
//   {  label: '首页' }
    { index: '', label: '聊天室1' },
  ]
});
void Menudata;
</script>
<style scoped lang="scss">
    .container {
        // background-color: white; /* 背景颜色 */
        // padding: 20px; /* 内边距 */
        // border-radius: 10px; /* 圆角 */ 
        margin-top: 40px;
        margin-left: 0px;
        margin-right: auto;

}
</style>