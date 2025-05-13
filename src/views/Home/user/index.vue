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
                <div><strong>{{ userinfo.follower }}</strong>
                    <div>关注数</div>
                </div>
                <div><strong>{{ userinfo.followed }}</strong>
                    <div>粉丝数</div>
                </div>
            </div>
            <div class="btn-group">
                <el-button v-if="!userinfo.is_follow" class="subscribe" type="success" @click="subscribe">
                    关注他
                </el-button>
                <el-button v-if="userinfo.is_follow" class="subscribe" type="success" @click="unsubscribe">
                    取消关注
                </el-button>
                <el-button class="message" type="default">发私信</el-button>
            </div>
            <template #footer>Footer content</template>
        </el-card>
        <div class="userbloglist">
            <div class="el-header">{{userinfo.name}}的博客</div>
            <div class="el-container">
                <div v-for="item in userbloglist" :key="item.blog_id" class="el-model">
                    <!-- <div class="title">{{ item.title }}</div> -->
                    <div class="title">
                        <router-link :to="`/home/blogdetail/${item.blog_id}`" class="titledetail">
                            <strong>{{ item.title }}</strong>
                        </router-link>
                    </div>
                    <span class="writer">
                        作者：
                        <router-link :to="`/home/user/${item.uid}`" class="username">
                            <strong>{{ item.user_name }}</strong>
                        </router-link>
                    </span>
                    <span class="likes">点赞：{{ item.likes }}</span>
                    <span class="comments">评论：{{ item.comments }}</span>

                </div>
            </div>
            <!-- <el-pagination size="small" layout="prev, pager, next" :total="50" /> -->
            <el-pagination size="10" background layout="prev, pager, next" :total="blogcount" class="mt-4"
                v-model:current-page="pageNo" />
        </div>
    </div>
</template>
<script setup lang="ts">
const VITE_API_URL = import.meta.env.VITE_API_URL
import { ref, onMounted, watch } from 'vue'
import type { User } from '@/api/Type/Home/type'
import Header from '@/components/Home/header.vue'
import { userdetail, follow, unfollow, getuserbloglist } from '@/api/Home/user'
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
const userbloglist = ref({})
const Menudata = ref({
    //   title: '首页',
    menu: [
        { index: '/home', label: '首页' },
        { label: '用户详情' }
    ]
})
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
//获取用户的博客列表
const Getuserbloglist = async () => {
    const res = await getuserbloglist(uid);
    if (res.status_code === 1) {
        userbloglist.value = res.Blogs
    } else {
        ElMessage.error(res.status_msg)
    }
}
onMounted(() => {
    getuserdetail()
    Getuserbloglist()
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

    .userbloglist {
        margin-top: 30px;
        .el-header {
            font-size: 25px;
            font-weight: bold;
            // margin-bottom: 10px;
            text-align: left;
        }
        .el-container {
            // margin-left: 180px;
            background-color: white;
            display: block;

            .el-model {

                text-align: left;
                border-bottom: 0.1px solid #ccc;
                margin-top: 5px;
                margin-bottom: 5px;
                margin-left: 10px;
                margin-right: 10px;

                .title {
                    text-align: left;
                    font-size: 35px;
                    font-weight: bold;
                    margin-bottom: 5px;
                    margin-left: 15px;

                    .titledetail {
                        color: black;
                    }
                }

                .writer {

                    font-size: 16px;
                    margin-right: 10px;
                    margin-left: 15px;

                    .username {
                        color: green;
                        font-size: 20px;
                    }
                }

                .likes {
                    font-size: 16px;
                    margin-right: 10px;
                    margin-left: 15px;
                }

                .comments {
                    font-size: 16px;
                    margin-right: 10px;
                    margin-left: 15px;
                }
            }
        }
    }
}
</style>