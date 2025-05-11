<template >
    <div>
        <Header :Menudata="Menudata" />
        <div class="el-container">
            <div class="title">
                {{ context.title }}
            </div>
            <div class="user">
                <el-avatar :size="50" :src="context.user_icon" class="evatar"/>
                <router-link :to="`/home/user/${context.uid}`" class="name">
                    <strong >{{ context.user_name }}</strong>
                </router-link>
            </div>
            <div class="content" v-html="context.content"></div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted,watchEffect } from 'vue'
import Header from '@/components/Home/header.vue'
import { blogdetail } from '@/api/Home/blogdetail'
import type { BlogDetailResponse } from '@/api/Type/Home/type'
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router'
const route = useRoute()
const blog_id = route.params.blog_id


const Menudata = ref({
    menu: [
        { index: '/home', label: '首页' },
        { label: '博客详情' }
    ]
})
const context = ref<BlogDetailResponse>({
    status_code: 0,
    status_msg: '',
    blog_id: 0,
    uid: 0,
    user_name: '',
    user_icon: '',
    title: '',
    content: '',
    likes: 0,
    comments: 0,
    comment: []
})
const Getblogdetail = async () => {
    const res = await blogdetail(blog_id)
    // console.log(res);
    if (res.status_code === 1) {
        context.value = res;
    } else {
        ElMessage.error('请求失败，请稍后再试');
        console.log(res);
    }
}
onMounted(async () => {
    Getblogdetail();
})
// 监听路由参数变化，重新获取博客详情
// watch(
//     () => route.params.blog_id,
//     (newId) => {
//         blog_id.value = newId;
//         if (newId) Getblogdetail()
//     }
// )
// 自动监听 route.params.blog_id 的变化
watchEffect(() => {
    const blog_Id = route.params.blog_id 
    if (blog_Id) {
        console.log(blog_Id)
        Getblogdetail()
    }
})
</script>
<style scoped lang="scss">
.el-container {
    margin: 150px auto 0;
    width: 1226px;
    display: flex;
    background-color: #fff;
    flex-direction: column;

    .title {
        font-size: 40px;
        font-weight: 600;
        text-align: left;
    }

    .user {
        display: flex;
        align-items: center;
        /* 垂直居中 */
        gap: 10px;

        /* 两个元素之间留点间距，可调 */
        .avatar {}

        .name {
            font-size: 20px;
            font-weight: 600;
            text-align: left;
            color: green;
        }
    }

    .content {
        font-size: 22px;
        line-height: 40px;
        text-align: left;
    }
}
</style>