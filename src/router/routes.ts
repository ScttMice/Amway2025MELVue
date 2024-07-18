import { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    redirect: { name: "login" },
    // component: () => import(/* webpackChunkName: "home" */ '@/views/index.vue')
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '',
      keepAlive: true,
    },
  },
  {
    name: 'auth',
    path: '/auth',
    component: () => import('@/views/info-auth/index.vue'),
    meta: {
      title: '',
      keepAlive: true,
    },
  },
  {
    name: 'uploadCertificate',
    path: '/upload-certificate/:id',
    component: () => import('@/views/upload-certificate/index.vue'),
    meta: {
      title: '',
      keepAlive: true,
    },
  },
  {
    name: 'pdfView',
    path: '/pdf-view/:pdf_name/:pdf_url',
    component: () => import('@/views/pdf-view/index.vue'),
    meta: {
      title: '',
      // keepAlive: true,
    },
  },
  {
    name: 'person',
    path: '/person',
    component: () => import('@/views/person/index.vue'),
    meta: {
      title: '',
      keepAlive: false,
    },
  },
  // 匹配不到重定向会主页
  {
    // 找不到路由重定向到404页面
    path: '/:pathMatch(.*)',
    redirect: '/',
  },
];

export default routes;
