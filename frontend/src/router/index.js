import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/403',
      name: 'err403',
      component: () => import('@/pages/error/403')
    },
    {
      path: '/404',
      name: 'err404',
      component: () => import('@/pages/error/404')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/login')
    },
    {
      path: '/setting',
      name: 'setting',
      component: () => import('@/pages/setting')
    },
    {
      path: '/',
      name: 'index',
      component: () => import('@/pages/index'),
      redirect: '/chat',
      children: [
        {
          path: '/calendar',
          name: 'calendar',
          component: () => import('@/pages/calendar'),
        },
        {
          path: '/chat',
          name: 'chat',
          component: () => import('@/pages/chat'),
        },
        {
          path: '/workbench',
          name: 'workbench',
          component: () => import('@/pages/workbench'),
        },
      ]
    }
  ]
})
