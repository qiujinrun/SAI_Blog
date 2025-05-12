<template >
    <div class="el-content">
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
        <div class="comment">
            <div class="el-header">{{context.comments}}条评论</div>
            <div class="comment-form">
                <el-avatar
                :size="50" 
                :src="avater_url"
                class="el-avater" />
                <el-form
                    ref="formDataRef"
                    :model="formData"
                    label-width="80px"
                >   
                    <!-- textarea输入 -->
                    <el-form-item label="" prop="comment">
                        <el-input
                        class="custom-textarea"
                        type="textarea" 
                        v-model="formData.comment" 
                        :rows="4" 
                        :maxlength="150"
                        resize="none"
                        show-word-limit
                        placeholder="手下留情，友好评论"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <el-button type="success" @click="Postcomment" class="el-btn" round>提交</el-button>
            </div>
            
            <div class="el-commentcontainer">
                <div v-for="item in context.comment" :key="item.blog_id" class="el-model">
                    <div class="detail">{{ item.comment }}</div>
                </div>
            </div>    
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted,watchEffect,onUnmounted } from 'vue'
import Header from '@/components/Home/header.vue'
import { blogdetail } from '@/api/Home/blogdetail'
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
//获取博客详情
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
//评论
const Postcomment = async () => {
    const res = await postcomment(blog_id,formData.value.comment)
    if (res.status_code === 1) {
        ElMessage.success('评论成功');
        Getblogdetail(); 
    } else {
        ElMessage.error('评论失败，请稍后再试');
    }
}
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
        font-size: 22px;
        line-height: 40px;
        text-align: left;
        margin-top: 20px;
    }
}
.comment{
    margin: 100px auto 0;
    width: 1226px;
    display: flex;
    background-color: #fff;
    flex-direction: column;
    border: 5px solid #e7e7e7;
    .el-header{
        font-size: 30px;
        font-weight: 600;
        text-align: left;
        margin-left: 20px;
        margin-top: 20px;
    }
   .el-commentcontainer{
        margin-top: 20px; 
   }
   .comment-form{
        // margin: 20px;
        margin-left: 10px;
        display: flex;
        gap: 10px;
        // align-items: center;
        .el-avater{
            size: 50px;
            margin-top: 10px;
            margin-left: 10px;
        }
        .el-form-item{
            width: 1000px;
        }
        .el-input{
            width: 100%;
        }
        .custom-textarea{
            font-size: 24px;
        }
    }
    .el-btn{
        display: flex;
        margin-left: 20px;
        width: 100px;
        height: 50px; 
    } 
}
.el-form-item__content{
     margin-left: 10px;
}
</style>