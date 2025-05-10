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
                <div><strong>{{ userinfo.follower }}</strong><div>关注数</div></div>
                <div><strong>{{ userinfo.followed }}</strong><div>粉丝数</div></div>
            </div>
            <div class="btn-group">
                <el-button
                v-if="!userinfo.is_follow"
                class="subscribe"
                type="success"
                @click="subscribe"
                >
                关注他
                </el-button>
                <el-button
                v-if="userinfo.is_follow"
                class="subscribe"
                type="success"
                @click="unsubscribe"
                >
                取消关注
                </el-button>
                <el-button class="message" type="default">发私信</el-button>
            </div>
            <template #footer>Footer content</template>
        </el-card>
        <div class="el-container">
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref,onMounted,watch } from 'vue'
import type { User } from '@/api/Type/Home/type'
import Header from '@/components/Home/header.vue'
import { userdetail,follow,unfollow } from '@/api/Home/user'
import { useRoute } from 'vue-router'
// import type { AxiosResponse } from 'axios';
import { ElMessage } from 'element-plus';
const route = useRoute()
const uid = route.params.uid
const userinfo = ref<User>({
    ID: 0,
    name: '',
    ico_url: '',
    follower: 0,
    following: 0,
    is_follow: false
})
const Menudata = ref({
//   title: '首页',
  menu: [
    { index: '/home', label: '首页' },
    {  label: '用户详情' }
  ]
})
const getuserdetail = async () => {
    const res = await userdetail(uid);
    console.log(res)
    if (res.status_code === 1) {
        userinfo.value = res.user;
    } else {
        ElMessage.error(res.status_msg)}
}
//监听变化，实时更新
watch(
    () => userinfo.value.is_follow,
    (newPath) => {
      getuserdetail()
    }
  )
//关注
const subscribe = async () => {
    const res = await follow(uid);
    console.log(res)
    if (res.status_code === 1) {
        ElMessage.success(res.status_msg)
        userinfo.value.is_follow = true
    } else {
        ElMessage.error(res.status_msg) 
    }
}
//取消关注
const unsubscribe = async () => {
    const res = await unfollow(uid);
    if (res.status_code === 1) {
        ElMessage.success(res.status_msg)
        userinfo.value.is_follow = false
    } else {
        ElMessage.error(res.status_msg) 
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