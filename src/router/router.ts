import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import store from '../store/store.ts'

const routerHistory = createWebHistory()
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/Signup.vue')
    },
    {
      // 动态路由匹配
      path: '/column/:id',
      name: 'column',
      component: () => import('../views/ColumnDetail.vue')
    },
    {
      // 动态路由匹配
      path: '/postDetail/:id',
      name: 'postDetail',
      component: () => import('../views/PostDetail.vue')
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('../components/CreatePost.vue')
    }
  ]
})

const whiteList = ['/login', '/signup', '/404']
// 前置守卫
router.beforeEach((to, from, next) => {
  if (store.state.token) {
    store.dispatch('fetchUser')
    // 登录状态
    if (to.path === '/login' || to.path === '/signup') {
      next('/')
    } else {
      next()
    }
  } else {
    // 未登录状态
    // 白名单直接放行
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
export default router
