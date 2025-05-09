<template lang="">
    <div>
        <Header :Menudata="Menudata" />
    </div>
</template>
<script setup lang="ts">
    import {  ref,onMounted,watch } from 'vue'
    import Header from '@/components/Home/header.vue'

    const Menudata = ref({
        menu: [
            { index: '/home', label: '首页' },
            {  label: '博客详情' }
        ] 
    })
</script>
<style scoped lang="scss">
    
</style>