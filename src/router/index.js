import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('@/views/Main.vue')
  },
  {
    path: '/bookmarks',
    name: 'bookmarks',
    component: () => import('@/views/Bookmarks.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router