<template lang="">
    <div>
        <Header :Menudata="Menudata" />
    </div>
    <div class="main-content">
        <el-card style="max-width: 480px">
    <template #header>
      <div class="card-header">
        <span>Card name</span>
      </div>
    </template>
    <p v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</p>
    <template #footer>Footer content</template>
  </el-card>
    </div>
</template>
<script setup lang="ts">
import { ref,onMounted } from 'vue'
import Header from '@/components/Home/header.vue'
import { userdetail } from '@/api/Home/user'
import { useRoute } from 'vue-router'
const route = useRoute()
const uid = route.params.uid
const Menudata = ref({
//   title: '首页',
  menu: [
    { index: '/home', label: '首页' },
    {  label: '用户详情' }
  ]
})

const getuserdetail = async () => {
  const res = await userdetail(uid)
  if (res.status_code === 1) {
    console.log(res)
  }
}
onMounted(() => {
  getuserdetail()
})
</script>
<style scoped lang="">
    
</style>