import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/cars',
  },
  {
    path: '/cars',
    name: 'cars',
    component: () => import('@/views/cars/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
