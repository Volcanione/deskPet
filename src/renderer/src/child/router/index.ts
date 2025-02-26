import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router'

export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/setting'
  },
  {
    path: '/setting',
    name: 'Setting',
    component: () => import('@renderer/child/views/setting/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory('/'),
  routes: constantRoutes
})

// 路由守卫
// router.beforeEach((to, from, next) => {
//   console.log(to)
//   console.log(from)
//   if (from.path !== '/') {
//     return next()
//   }
//   next('/index')
// })

export default router
