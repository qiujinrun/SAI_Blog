<template>
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
                <div><strong>{{ userinfo.follower }}</strong>
                    <div>关注数</div>
                </div>
                <div><strong>{{ userinfo.followed }}</strong>
                    <div>粉丝数</div>
                </div>
            </div>
            <template #footer>Footer content</template>
        </el-card>
    </div>
</template>

<script setup>
import { ref,onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store/modules/user'
import { userdetail, follow, unfollow, getuserbloglist } from '@/api/Home/user'
const userStore = useUserStore()
const uid = userStore.userInfo.ID;

//获取我的信息
const userinfo = ref({})
const getuserdetail = async () => {
    const res = await userdetail(uid);
    console.log(res)
    if (res.status_code === 1) {
        userinfo.value = res.user;
        userinfo.value.ico_url = VITE_API_URL  + userinfo.value.ico_url;
        console.log(userinfo.value.ico_url)
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

    .card-header {
        font-size: 18px;
    }

    .username {
        font-size: 30px;
        font-weight: bold;
    }

    .user-stats {
        display: flex;
        justify-content: space-around;
        margin: 12px 0;
        font-size: 22px;
    }

    .btn-group {
        .subscribe {
            font-size: 20px;
            width: 200px;
            height: 50px;
        }

        .message {
            margin-left: 30px;
            font-size: 20px;
            width: 200px;
            height: 50px;
        }
    }
}
</style>