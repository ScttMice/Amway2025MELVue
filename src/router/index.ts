import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/index.vue')
  },
  {
    path: '/person',
    name: 'Person',
    component: () => import(/* webpackChunkName: "person" */ '@/views/person.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
