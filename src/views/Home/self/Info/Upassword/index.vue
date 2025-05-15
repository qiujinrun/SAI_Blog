<template lang="">
    <div>
        修改密码
    </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
const token = route.query.token as string
console.log('token from email:', token)
</script>
<style lang="">
    
</style>