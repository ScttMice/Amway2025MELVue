import { createRouter, createWebHistory,type RouteLocationNormalized } from 'vue-router'
import NProgress from "@/utils/progress";
import routes from './routes';

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from) {
    return { top: 0 };
  },
})

export interface toRouteType extends RouteLocationNormalized {
  meta: {
    title?: string;
    noCache?: boolean;
  };
}

router.beforeEach((to: toRouteType, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router
