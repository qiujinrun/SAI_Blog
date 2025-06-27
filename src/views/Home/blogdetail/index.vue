<template>
    <div class="el-content">
        <Header :Menudata="Menudata" />
        <div class="el-likes">
            <!-- <div class="el-icon">
                <el-icon>
                    <i class="el-icon-thumb-up"></i>
                </el-icon>
            </div>
            <div class="el-text">{{ context.likes }}</div> -->
        </div>
        <div class="el-container">
            <div class="title">
                {{ context.title }}
            </div>
            <div class="user">
                <el-avatar :size="50" :src="context.user_icon" class="evatar" />
                <router-link :to="`/home/user/${context.uid}`" class="name">
                    <strong>{{ context.user_name }}</strong>
                </router-link>
            </div>
            <div class="content" v-html="context.content"></div>
        </div>
        <div class="foot-likes">
            <el-button type="success" class="foot-btn" @click="Likes" plain>
                <el-icon>
                    <i class="el-icon-thumb-up">点赞</i>
                </el-icon>
            </el-button>
        </div>
        <div class="comment">
            <div class="el-header">{{ context.comments }}条评论</div>
            <div class="comment-form">
                <el-avatar :size="50" :src="avater_url" class="el-avater" />
                <el-form ref="formDataRef" :model="formData" label-width="80px">
                    <!-- textarea输入 -->
                    <el-form-item label="" prop="comment">
                        <el-input class="custom-textarea" type="textarea" v-model="formData.comment" :rows="4"
                            :maxlength="150" resize="none" show-word-limit placeholder="手下留情，友好评论"></el-input>
                    </el-form-item>
                </el-form>
                <el-button type="success" @click="Postcomment" class="el-btn">提交</el-button>
            </div>

            <div class="el-commentcontainer">
                <div class="el-comment-item" v-for="item in context.comment_info" :key="item.Comment.blog_id">
                    <el-avatar :size="40" :src="'http://1.95.40.68:8081' + item.user.ico_url" class="comment-avater" />
                    <div class="comment-content">
                        <div class="comment-header">
                            <!-- <div class="username">{{ item.user.name }}</div> -->
                            <router-link :to="`/home/user/${item.user.ID}`" class="username">
                                <strong>{{ item.user.name }}</strong>
                            </router-link>
                            <span class="dot">•</span>
                            <div class="comment-detail">{{ item.Comment.comment }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
// const VITE_API_URL = import.meta.env.VITE_API_URL
import { ref, onMounted, watchEffect, onUnmounted } from 'vue'
import Header from '@/components/Home/header.vue'
import { blogdetail, givelike } from '@/api/Home/blogdetail'
import { postcomment } from '@/api/Comment'
import type { BlogDetailResponse } from '@/api/Type/Home/type'
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
const route = useRoute()
const blog_id = route.params.blog_id
//评论
const formData = ref({ comment: '' })
// 获取Store信息
const userStore = useUserStore()
const avater_url = userStore.userInfo.ico_url
// const uid = userStore.userInfo.ID

const Menudata = ref({
    menu: [
        { index: '/home', label: '首页' },
        { index: '', label: '博客详情' }
    ]
})
//博客详情
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
    comment_info: []
})
//获取评论列表
import type { Comment_info } from '@/api/Type/Home/type' // 根据你的路径调整

const comment_info = ref<Comment_info[]>([])

watchEffect(() => {
    if (context.value.comment_info) {
        comment_info.value = context.value.comment_info
    }
})

const Getblogdetail = async () => {
    const res = await blogdetail(blog_id)
    // console.log(res);
    if (res.status_code === 1) {
        context.value = res;
        context.value.user_icon = "http://1.95.40.68:8081" + context.value.user_icon;
    } else {
        ElMessage.error('请求失败，请稍后再试');
        console.log(res);
    }
}
//评论
const Postcomment = async () => {
    const res = await postcomment(blog_id, formData.value.comment)
    if (res.status_code === 1) {
        ElMessage.success('评论成功');
        Getblogdetail();
    } else {
        ElMessage.error('评论失败，请稍后再试');
    }
}
//点赞
const Likes = async () => {
    const res = await givelike(blog_id)
    if (res.status_code === 1) {
        ElMessage.success('点赞成功');
        Getblogdetail();
    } else {
        ElMessage.error('点赞失败，请稍后再试');
    }
}
//取消点赞
// const Cancellike = async () => {
//     const res = await cancellike(blog_id)
//     if (res.status_code === 1) {
//      ElMessage.success('取消点赞成功');
//      Getblogdetail();
//     } else {
//      ElMessage.error('取消点赞失败，请稍后再试');
//     }
//  }
onMounted(async () => {
    document.body.classList.add('blog-detail')
    window.scrollTo({ top: 0, behavior: 'smooth' })
    Getblogdetail();
})
onUnmounted(() => {
    document.body.classList.remove('blog-detail')
})
watchEffect(() => {
    const blog_Id = route.params.blog_id
    if (blog_Id) {
        console.log(blog_Id)
        Getblogdetail()
    }
})
</script>
<style scoped lang="scss">
.el-content {
    .el-likes {
        position: fixed;
        top: 35%;
        left: 10px;
        transform: translateY(-50%);
        width: 100px;
        height: 100px;
        background-color: #fff;
        border-radius: 50%;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        /* 垂直居中 */
    }

    .el-container {
        margin: 150px auto 0;
        padding: 20px;
        width: 1226px;
        display: flex;
        background-color: #fff;
        flex-direction: column;
        border: 5px solid #e0e0e0;
        min-height: 1000px;

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
            font-size: 25px;
            line-height: 40px;
            text-align: left;
            margin-top: 20px;
            color: black;
        }
    }

    .foot-likes {
        display: flex;
        justify-content: center;
        margin-top: 20px;
        /* 水平居中 */
        gap: 10px;

        /* 两个元素之间留点间距，可调 */
        .foot-btn {
            width: 100px;
            height: 50px;
            font-size: 20px;
        }
    }

    .comment {
        margin: 100px auto 0;
        width: 1226px;
        display: flex;
        background-color: #fff;
        flex-direction: column;
        border: 5px solid #e7e7e7;

        .el-header {
            font-size: 30px;
            font-weight: 600;
            text-align: left;
            margin-left: 20px;
            margin-top: 20px;
        }

        .el-commentcontainer {
            margin-top: 20px;
            margin-left: 20px;
            margin-bottom: 20px;
            display: flex;
            flex-direction: column;
            gap: 12px;


            .el-comment-item {
                display: flex;
                align-items: flex-start;
                gap: 10px;
                margin-right: 20px;
                padding-bottom: 15px;
                border-bottom: 1px solid #e0e0e0;

                .comment-avater {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    flex-shrink: 0;
                }

                .comment-content {
                    display: flex;
                    flex-direction: column;
                    flex: 1;
                    text-align: left;

                    .comment-header {
                        font-size: 14px;
                        line-height: 1.4;
                        color: #333;

                        .username {
                            font-size: 20px;
                            // display: block;
                            font-weight: bold;
                            color: green;
                        }

                        .dot {
                            display: block;
                            margin: 0 5px;
                            color: #333;
                        }

                        .comment-detail {
                            font-size: 22px;
                            color: #666;
                        }
                    }
                }
            }
        }

        .comment-form {
            // margin: 20px;
            margin-left: 10px;
            display: flex;
            gap: 10px;

            // align-items: center;
            .el-avater {
                size: 50px;
                margin-top: 10px;
                margin-left: 10px;
            }

            .el-form-item {
                width: 1000px;
            }

            .el-input {
                width: 100%;
            }

            .custom-textarea {
                font-size: 24px;
            }
        }

        .el-btn {
            display: flex;
            margin-left: 20px;
            width: 100px;
            height: 50px;
        }
    }

    .el-form-item__content {
        margin-left: 10px;
    }
}
</style>