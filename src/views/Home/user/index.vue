<template lang="">
    <div>
        <Header :Menudata="Menudata" />
    </div>
    <div class="main-content">
        <el-card style="max-width: 480px">
            <template #header>
            <div class="card-header">
                <span>创作者信息</span>
            </div>
            </template>
            <el-avatar :size="150" :src="userinfo.ico_url" />
            <div class="username">
                <span>{{userinfo.name}}</span>
            </div>
            <div class="user-stats">
                <div><strong>{{ userinfo.followed }}</strong><div>关注数</div></div>
                <div><strong>{{ userinfo.follower }}</strong><div>粉丝数</div></div>
            </div>
            <div class="btn-group">
                <el-button class="subscribe" type="success" @click="subscribe">关注他</el-button>
                <el-button class="message" type="default">发私信</el-button>
            </div>
            <template #footer>Footer content</template>
        </el-card>
    </div>
</template>
<script setup lang="ts">
import { ref,onMounted } from 'vue'
import Header from '@/components/Home/header.vue'
import { userdetail } from '@/api/Home/user'
import { useRoute } from 'vue-router'
import type { AxiosResponse } from 'axios';
const route = useRoute()
const uid = route.params.uid
const userinfo = ref({})
const Menudata = ref({
//   title: '首页',
  menu: [
    { index: '/home', label: '首页' },
    {  label: '用户详情' }
  ]
})
interface UserDetailResponse {
    status_code: number;
  user: {
    id: number;
    name: string;
  };
}
const getuserdetail = async () => {
    const res: AxiosResponse<UserDetailResponse> = await userdetail(uid);
        console.log(res)
  if (res.status_code === 1) {
     userinfo.value = res.user
  }
}
onMounted(() => {
  getuserdetail()
})
</script>
<style scoped lang="scss">
.main-content {
  margin-top: 30px;
  .card-header{
//    display: flex;
   font-size: 18px;
  }
    .username{
     font-size: 30px;
     font-weight: bold;
   }
   .user-stats {
    display: flex;
    justify-content: space-around;
    margin: 12px 0;
    font-size: 22px;
    }
    .btn-group{
        .subscribe{
            font-size: 20px;
            width: 200px;
            height: 50px;
        }
        .message{
            margin-left: 30px;
            font-size: 20px;
            width: 200px;
            height: 50px; 
        }
    }
}
</style>