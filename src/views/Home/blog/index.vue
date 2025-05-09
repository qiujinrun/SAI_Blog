<template lang="">
    <div>
        <div class="el-header">博客列表</div>
        <div class="el-container"> 
            <div v-for="item in bloglist" :key="item.blog_id" class="el-model">
                <div class="title">{{ item.title }}</div>
                <!-- <div class="content">{{ item.content }}</div> -->
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
            :total="totalmsg"
            class="mt-4"
            v-model:current-page="pageNo"
        />
    </div>
</template>
<script setup lang="ts">
import { ref,onMounted } from 'vue';
import { getbloglist } from '@/api/Home';
// import { ElMessage } from 'element-plus';
let pageNo = ref<string>('1')
let key = ref<string>('') 
let totalmsg = ref<number>(90)
const bloglist = ref<Blog[]>([]);
// let pageSize = ref<number>(10)
// // let total = ref<number>(0)

//定义数据类型
interface Blog {
  blog_id: number;
  uid: number;
  title: string;
  content: string;
  likes: number;
  comments: number;
  comment: {
    blog_id: number;
    cid: number;
    comment: string;
  }[];
}

interface BlogListResponse {
  status_code: number;
  status_msg: string;
  Blogs: Blog[];
}
const fetchBlogList = async () => {
  const res = await getbloglist(key.value, pageNo.value);
  const data: BlogListResponse = res;
  bloglist.value = data.Blogs;
  totalmsg.value = data.Blogs.length;
  console.log(bloglist.value);
};
onMounted(async () => {
    // const res = await getbloglist(key.value,pageNo.value);
    // const data: BlogListResponse = res;
    // bloglist.value = data.Blogs; 
    // console.log(bloglist.value);  
    fetchBlogList();
})
</script>
<style scoped lang="scss"> 
.el-header{
    margin-bottom: -10px;
    margin-left: 200px;
    text-align: left;
}
.el-container{
    // margin-left: 180px;
    background-color: white;
    display: block;
    .el-model{
 
        text-align: left;
        border-bottom: 0.1px solid #ccc;
        margin-top: 5px;
        margin-bottom: 5px;
        margin-left: 10px;
        margin-right: 10px;
        .title{
            text-align: left;
            font-size: 35px;
            font-weight: bold;
            margin-bottom: 5px;
            margin-left: 15px;
        }
        .writer{

            font-size: 16px;
            margin-right: 10px;
            margin-left: 15px;
            .username{
                color: green;
                font-size: 20px;
            }
        }
       .likes{
            font-size: 16px;
            margin-right: 10px;
            margin-left: 15px;
        } 
        .comments{
            font-size: 16px;
            margin-right: 10px; 
            margin-left: 15px;
        }
       }
    }
</style>