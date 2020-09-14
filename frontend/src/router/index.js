import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)

const routerConfig = new Router({
  mode: 'history',
  routes: [
    {
      path: '/403',
      name: 'err403',
      component: () => import('@/pages/error/403')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/login')
    },
    {
      path: '/help',
      name: 'help',
      component: () => import('@/pages/help')
    },
    {
      path: '/',
      name: 'index',
      component: () => import('@/pages/index'),
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
        {
          path: '/setting',
          name: 'setting',
          component: () => import('@/pages/setting'),
          children: [
            {
              path: '/setting/base',
              name: 'base',
              component: () => import('@/components/settings/baseSetting'),
            },
            {
              path: '/setting/safe',
              name: 'safe',
              component: () => import('@/components/settings/safeSetting'),
            },
            {
              path: '/setting/bind',
              name: 'bind',
              component: () => import('@/components/settings/bindSetting'),
            }
          ]
        },
      ]
    },
    {
      path: '*',
      name: 'err404',
      component: () => import('@/pages/error/404')
    }
  ]
})

routerConfig.beforeEach((to, from, next) => {
  store.commit('CHANGE_ROUTE', to.name)
  next()
}) 

export default routerConfig