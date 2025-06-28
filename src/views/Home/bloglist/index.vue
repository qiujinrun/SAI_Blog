<template lang="">
    <div>
        <div class="el-header">博客</div>
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
        <!-- <el-pagination size="small" layout="prev, pager, next" :total="50" /> -->
        <el-pagination
            size="10"
            background
            layout="prev, pager, next"
            :total="blogcount"
            class="mt-4"
            v-model:current-page="pageNo"
        />
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { getbloglist, getblogcount } from '@/api/Home';
import type { Blog } from '@/api/Type/Home/type';
import { ElMessage } from 'element-plus';
let pageNo = ref<string>('1');
let key = ref<string>('');
let totalmsg = ref<number>(90);
const bloglist = ref({} as Blog[]);
const blogcount = ref<number>(0);
// let pageSize = ref<number>(10)
// // let total = ref<number>(0)


watch(pageNo, (newVal) => {
    fetchBlogList();
    console.log(newVal);
});
const fetchBlogList = async () => {
    const res = await getbloglist(key.value, pageNo.value);
    if (res.status_code === 1) {
        bloglist.value = res.Blogs;
        totalmsg.value = res.Blogs.length;
    } else {
        ElMessage.error('登录请求失败，请稍后再试');
    }
};
const fetchBlogCount = async () => {
    const res = await getblogcount();
    if (res.status_code === 1) {
        blogcount.value = res.status_msg;
    } else {
        ElMessage.error('登录请求失败，请稍后再试');
    }
};
onMounted(async () => {
    fetchBlogList();
    fetchBlogCount();
});
</script>
<style scoped lang="scss">
.el-header {
    margin-bottom: -10px;
    text-align: left;
    font-size: 30px;
    font-weight: bold;
    color: black;

}

.el-container {
    // margin-left: 180px;
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