<template lang="">
    <div>
        <Header :Menudata="Menudata" />
        <div class="el-container">
            <div class="title">
                {{ context.title }}
            </div>
            <div class="user">
                <el-avatar :size="50" :src="context.user_icon" class="evatar"/>
                <router-link :to="`/home/user/${context.uid}`" class="name">
                    <strong>{{ context.user_name }}</strong>
                </router-link>
            </div>
            <div class="content">
                {{ context.content }}
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Header from '@/components/Home/header.vue'
import { blogdetail } from '@/api/Home/blogdetail'
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router'
const route = useRoute()
const blog_id = route.params.blog_id;
const Menudata = ref({
    menu: [
        { index: '/home', label: '首页' },
        { label: '博客详情' }
    ]
})
const context = ref({})
const Getblogdetail = async () => {
    const res = await blogdetail(blog_id)
    console.log(res);
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
        .avatar {

        }

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