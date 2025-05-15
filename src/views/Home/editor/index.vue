<template lang="">
    <!-- 固定在顶部的 Header -->
    <Header :Menudata="Menudata" />
    <div class="editor-container">
        <div> 标题 </div>
        <input 
        v-model="editortitle"
        placeholder="请输入标题"
        style="width: 99%;height:30px; padding: 5px;margin: 5px 0;font-size: 20px;"
        ></input>
        <div> 正文 </div>
        <div style="border: 1px solid #ccc">
            <Toolbar
                style="border-bottom: 1px solid #ccc"
                :editor="editorRef"
                :defaultConfig="toolbarConfig"
                :mode="mode"
            />
            <Editor
                style="height: 500px; overflow-y: hidden;"
                v-model="valueHtml"
                :defaultConfig="editorConfig"
                :mode="mode"
                @onCreated="handleCreated"
            />
        </div>
        <el-button type="primary" @click="PostBlog">上传博客</el-button>
    </div>
</template>
<script setup>
  import { onBeforeUnmount, ref, shallowRef, onMounted,watch } from 'vue'
import Header from '@/components/Home/header.vue'
import { Toolbar, Editor } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css'
import { postblog } from '@/api/PostBlog'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter()
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
const toolbarConfig = {}
const editortitle = ref('')
// 内容 HTML
const valueHtml = ref('')
const mode = 'default' // 或 'simple' 取决于你想要的样式
const editorConfig = {
  placeholder: '请输入内容...',
  MENU_CONF: {
    uploadImage: {
      server: '/api/blog/content-images-load', // 你的上传接口地址
      fieldName: 'file', // 上传字段名
      // 自定义上传成功后返回的图片 URL（如果后端结构和默认不一样）
      customInsert(res, insertFn) {
        const baseUrl = 'http://1.95.40.68:8081'
        const url = res.status_msg || res[0]
        const fullurl = baseUrl + url
        if (res.status_code === 1) {
          insertFn(fullurl)
          ElMessage.success('上传成功') 
        } else {
          ElMessage.error('上传失败') 
        }
      },
      headers: {
        // 如果需要 token 认证
        Authorization: `${localStorage.getItem('token')}`
      },
      // 限制类型、大小等
      allowedFileTypes: ['image/*'],
      maxFileSize: 2 * 1024 * 1024, // 2MB
    }
  }
}
watch(
  () => editorConfig.value,
  (newValue) => {
    console.log('标题变化：', newValue)
  } 
)


const Menudata = ref({

  menu: [
//   {  label: '首页' }
    { index: '/home', label: '首页' },
    { index: '', label: '撰写博客' }
  ]
})

// const insertText = () => {
//   const editor = editorRef.value // 获取 editor ，必须等待它渲染完之后
//   if (editor == null) return

//   editor.insertText('hello world') // 执行 editor API
// }

const PostBlog = async (e) => {
    const answer = {
        title: editortitle.value,
        content: valueHtml.value 
    }
  try {
    
    const answerJson = JSON.stringify(answer);
    console.log(answer)
    const res = await postblog(answerJson)
    if (res.status_code === 1) {
      ElMessage.success('上传成功') 
      router.push('/home')
    } else {
      ElMessage.error('上传失败') 
    }
    console.log(res) 
  }catch (error) {
    console.log(error) 
  }
}
const handleCreated = (editor) => {
  editorRef.value = editor
}
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})
</script>
<style scoped lang="scss">
.editor-container {
  padding-top: 80px; /* 视情况调整 */
  font-size: 20px;
  text-align: left;
  .el-button {
    margin-top: 20px; /* 视情况调整 */ 
  }
}
</style>