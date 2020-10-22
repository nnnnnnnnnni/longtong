import Vue from "vue";
import Router from "vue-router";
import store from "../store";

Vue.use(Router);

const routerConfig = new Router({
  mode: "history",
  routes: [
    {
      path: "/403",
      name: "err403",
      meta: {
        pageTitle: '4 0 3!'
      },
      component: () => import("@/pages/error/403")
    },
    {
      path: "/login",
      name: "login",
      meta: {
        pageTitle: '登录'
      },
      component: () => import("@/pages/login")
    },
    {
      path: "/help",
      name: "help",
      meta: {
        pageTitle: 'H E L P!'
      },
      component: () => import("@/pages/help")
    },
    {
      path: "/guide",
      name: "guide",
      meta: {
        pageTitle: '使用指南!'
      },
      component: () => import("@/pages/guide")
    },
    {
      path: "/",
      name: "index",
      redirect: {
        name: 'calendar'
      },
      meta: {
        pageTitle: '首页'
      },
      component: () => import("@/pages/index"),
      children: [
        {
          path: "/profile/:id",
          name: "profile",
          meta: {
            pageTitle: '日历'
          },
          component: () => import("@/pages/profile")
        },
        {
          path: "/calendar",
          name: "calendar",
          meta: {
            pageTitle: '日历'
          },
          component: () => import("@/pages/calendar")
        },
        {
          path: "/chat",
          name: "chat",
          meta: {
            pageTitle: '交流'
          },
          component: () => import("@/pages/chat")
        },
        {
          path: "/setting",
          name: "setting",
          component: () => import("@/pages/setting"),
          redirect: {
            name: 'base'
          },
          children: [
            {
              path: "/setting/base",
              name: "base",
              meta: {
                pageTitle: '基本设置'
              },
              component: () => import("@/components/settings/baseSetting")
            },
            {
              path: "/setting/safe",
              name: "safe",
              meta: {
                pageTitle: '安全设置'
              },
              component: () => import("@/components/settings/safeSetting")
            },
            {
              path: "/setting/bind",
              name: "bind",
              meta: {
                pageTitle: '绑定设置'
              },
              component: () => import("@/components/settings/bindSetting")
            },
            {
              path: "/setting/company",
              name: "company",
              meta: {
                pageTitle: '公司设置'
              },
              component: () => import("@/components/settings/companySetting")
            },
          ]
        },
        {
          path: "/workbench",
          name: "workbench",
          component: () => import("@/pages/workbench"),
          children: [
            {
              path: "/workbench/home",
              name: "home",
              meta: {
                pageTitle: '首页'
              },
              component: () => import("@/components/workbench/home")
            },
            {
              path: "/workbench/mission",
              name: "mission",
              meta: {
                pageTitle: '任务'
              },
              component: () => import("@/components/workbench/missions")
            },
            {
              path: "/workbench/project",
              name: "project",
              meta: {
                pageTitle: '项目'
              },
              component: () => import("@/components/workbench/projects")
            }
          ]
        }
      ]
    },
    {
      path: "*",
      name: "err404",
      meta: {
        pageTitle: '4 0 4!'
      },
      component: () => import("@/pages/error/404")
    }
  ]
});

routerConfig.beforeEach((to, from, next) => {
  store.commit("CHANGE_ROUTE", to.name);
  document.title = to.meta.pageTitle;
  // console.log(store.state.route)
  next();
});

export default routerConfig;
