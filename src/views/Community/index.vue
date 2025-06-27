<template lang="">
    <Header :Menudata="Menudata" />

    <div class="main-container p-4">     
        聊天室   
        <div class="chat-box border h-64 overflow-y-auto p-2 bg-white shadow rounded mb-2">
            <div v-for="(msg, i) in messages" :key="i">
                <strong>{{ msg.name }}:</strong> {{ msg.text }}
            </div>
        </div>
        <div class="flex gap-2">
            <input v-model="input" class="border p-2 flex-1 rounded" @keyup.enter="send" />
            <button @click="send" class="bg-blue-500 text-white px-4 rounded">发送</button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Header from '@/components/Home/header.vue'
void Header
const Menudata = ref({
    // title: '首页',
    menu: [
        { index: '/home', label: '首页' },
        { index: '', label: '聊天室' },
    ]
})
void Menudata

//聊天室功能
const ws = ref<WebSocket | null>(null)
const messages = ref<{ name: string, text: string }[]>([])
const input = ref('')
// const username = ref(prompt('请输入昵称') || '匿名用户')
const connect = () => {
    ws.value = new WebSocket('ws://1.95.40.68/ws?groupId=1')
    // ws.value = new WebSocket('ws://localhost:8000')
    ws.value.onopen = () => {
        console.log('WebSocket连接成功')
    }
    ws.value.onmessage = (event) => {
        const msg = JSON.parse(event.data)
        messages.value.push({
            name: msg.from_user.name,
            text: msg.content,
        })
    }
    ws.value.onclose = () => {
        console.log('WebSocket连接关闭')
    }
    ws.value.onerror = (err) => {
        console.error('WebSocket发生错误', err)
    }
}
const send = () => {
    if (ws.value && input.value.trim()) {
        const msg = {
            name: '用户',
            text: input.value
        }
        ws.value.send(JSON.stringify(msg)) // 发送字符串格式
        messages.value.push(msg)
        input.value = ''
    }
}
void send
onMounted(() => {
    connect()
})
onBeforeUnmount(() => {
    if (ws.value) {
        ws.value.close()
    }
})
</script>
<style scoped lang="scss">
.main-container {
    background-color: white;
    /* 背景颜色 */
    padding: 20px;
    /* 内边距 */
    border-radius: 10px;
    /* 圆角 */
    margin-top: 50px;
}
</style>