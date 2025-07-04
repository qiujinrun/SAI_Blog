import { createRouter, createWebHistory } from 'vue-router';
//安装vue-router
import 'vue-router';

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
      path: '/home/blogdetail/:blog_id', 
      name: '博客详情', 
      component: () => import('../views/Home/blogdetail/index.vue'),
    },
    {
      path: '/reset',
      name: '重置密码',
      component: () => import('../views/Home/self/Info/Upassword/index.vue'), 
    },
    {
      path: '/community/detail',
      name: '聊天室',
      component: () => import('../views/Community/index.vue'), 
    },
    {
      path: '/home/self', 
      name: '个人主页', 
      component: () => import('../views/Home/self/index.vue'),
      redirect: '/home/self/infomation',
      children:[
        {
          path: '/self/information',
          name: '个人设置',
          component: () => import('../views/Home/self/Info/index.vue')
        },
        {
          path: '/self/blog',
          name: '个人博客',
          component: () => import('../views/Home/self/Blog/index.vue') 
        }  
      ]
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
          component: () => import('../views/Home/bloglist/index.vue') 
        },
        {
          path: 'subscribe',
          name: '关注订阅',
          component: () => import('../views/Home/subscribe/index.vue') 
        },
        {
          path: 'community',
          name: '社区',
          component: () => import('../views/Home/community/index.vue') 
        },
      ]
    }
  ]
});