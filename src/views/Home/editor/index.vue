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
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
const toolbarConfig = {}
const editorConfig = { placeholder: '请输入内容...' }
const editortitle = ref('')
// 内容 HTML
const valueHtml = ref('')
const mode = 'default' // 或 'simple' 取决于你想要的样式

// watch(editorRef, (newVal, oldVal) => {
//   if (newVal) {
//     console.log('editor 已创建:', newVal)
//     // 你可以在这里对 editor 实例做一些操作
//   }
// })
const Menudata = ref({
  title: '编辑页面',
  menu: [
//   {  label: '首页' }
    // { index: '/branch/member-info', label: '首页' },
    // { index: '/branch/personnel', label: '人员管理' }
  ]
})

// const insertText = () => {
//   const editor = editorRef.value // 获取 editor ，必须等待它渲染完之后
//   if (editor == null) return

//   editor.insertText('hello world') // 执行 editor API
// }
const content = {
  title: editortitle,
  content: valueHtml.value 
}
const PostBlog = async (content) => {
  try {
    const res = await postblog(content)
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