<template lang="">
    <div>
        <div class="el-header">博客列表</div>
        <div class="el-container"> 
            <div v-for="item in bloglist" :key="item.blog_id" class="el-model">
                <div class="title">标题：{{ item.title }}</div>
                <div class="content">{{ item.content }}</div>
                <span>点赞：{{ item.likes }}</span>
                <span>评论：{{ item.comments }}</span>

            </div>
        </div>
        

                <!-- <el-pagination 
                        v-model:current-page="pageNo"
                        v-model:page-size="pageSize"
                        :page-sizes="[10,20,30,40]"
                        :background="true"
                        layout="prev, pager, next, jumper, ->, sizes, total"
                        :total="total"
                        @current-change="currentChange"
                        @size-change = "sizeChange"
                    />  -->
    </div>
</template>
<script setup lang="ts">
import { ref,onMounted } from 'vue';
import { getbloglist } from '@/api/Home';
// import { ElMessage } from 'element-plus';
let pageNo = ref<string>('1')
let key = ref<string>('') 
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

onMounted(async () => {
    const res = await getbloglist(key.value,pageNo.value);
    const data: BlogListResponse = res;
    bloglist.value = data.Blogs; 
    console.log(bloglist.value);  
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
        // text-align: left;
        border-bottom: 0.1px solid #ccc;
        margin-top: 5px;
        margin-bottom: 5ox;
        span{
            margin-right: 5px;
        }
    }
}
</style>