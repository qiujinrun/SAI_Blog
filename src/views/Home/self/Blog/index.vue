<template>
    <div class="userbloglist">
        <div class="el-header">我的博客</div>
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
</template>

<script setup>
import { ref,onMounted } from 'vue'
import { getuserbloglist } from '@/api/Home/user'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store/modules/user'
const userStore = useUserStore()
const uid = userStore.userInfo.ID
const userbloglist = ref([]) // 博客列表数据
//获取用户的博客列表
const Getuserbloglist = async () => {
    const res = await getuserbloglist(uid);
    if (res.status_code === 1) {
        userbloglist.value = res.Blogs
        console.log(userbloglist.value)
    } else {
        ElMessage.error(res.status_msg)
    }
}
onMounted(() => {
    Getuserbloglist() 
})
</script>
<style scoped lang="scss">
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
</style>