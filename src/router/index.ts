import { createRouter, createWebHistory } from 'vue-router'
//安装vue-router
import 'vue-router'

export default createRouter({
  history: createWebHistory(), 
  routes:[
    {
      path: '/', 
      redirect: '/Login', 
    },
    {
      path: '/Login', 
      name: 'Login', 
      component: () => import('../views/Login/index.vue'),
    },
    {
      path: '/editor', 
      name: '编辑博客', 
      component: () => import('../views/Home/editor/index.vue'),
    },
    {
      path: '/home/user/:uid', 
      name: '作者详情', 
      component: () => import('../views/Home/user/index.vue'),
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('../views/Home/index.vue') ,
      redirect: '/home/blog',
      children:[
        {
          path: 'blog',
          name: '博客',
          component: () => import('../views/Home/blog/index.vue') 
        },
        {
          path: 'subscribe',
          name: '关注订阅',
          component: () => import('../views/Home/subscribe/index.vue') 
        },
      ]
    }
  ]
})