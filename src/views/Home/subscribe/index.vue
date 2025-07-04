<template lang="">
    <div>
        我的订阅
    </div>
    <div class="el-container">
        <div v-for="item in bloglist" :key="item.blog_id" class="el-model">
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
</template>
<script setup lang="ts">
import { Usersubscribe } from "@/api/Home/subscribe";
import { ref, onMounted, watch } from 'vue';
import { ElMessage } from 'element-plus';
import type { Blog } from "@/api/Type/Home/type";
let page = ref();
let bloglist = ref<Blog>();

const GetSubscribeList = async () => {
    const res = await Usersubscribe(page.value);
    if (res.status_code === 1) {
        bloglist.value = res.Blogs;
    } else {
        ElMessage.error("获取失败，请稍后重试");
    }
};

onMounted(async () => {
    GetSubscribeList();
});
</script>
<style lang="scss" scoped>
.el-container {
    margin-left: -0px;
    background-color: white;
    display: block;
    color: black;

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
            color: black;

            .username {
                color: green;
                font-size: 20px;
            }
        }

        .likes {
            font-size: 16px;
            margin-right: 10px;
            margin-left: 15px;
            color: black;
        }

        .comments {
            font-size: 16px;
            margin-right: 10px;
            margin-left: 15px;
            color: black;
        }
    }
}
</style>