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
        allowAnonymous: true,
        pageTitle: "4 0 3!"
      },
      component: () => import("@/pages/error/403")
    },
    {
      path: "/login",
      name: "login",
      meta: {
        allowAnonymous: true,
        pageTitle: "登录"
      },
      component: () => import("@/pages/login")
    },
    {
      path: "/help",
      name: "help",
      meta: {
        allowAnonymous: true,
        pageTitle: "H E L P!"
      },
      component: () => import("@/pages/help")
    },
    {
      path: "/guide",
      name: "guide",
      meta: {
        allowAnonymous: false,
        pageTitle: "使用指南!"
      },
      component: () => import("@/pages/guide")
    },
    {
      path: "/",
      name: "index",
      redirect: {
        name: "calendar"
      },
      meta: {
        allowAnonymous: false,
        pageTitle: "首页"
      },
      component: () => import("@/pages/index"),
      children: [
        {
          path: "/profile/:id",
          name: "profile",
          meta: {
            allowAnonymous: false,
            pageTitle: "个人中心"
          },
          component: () => import("@/pages/profile")
        },
        {
          path: "/calendar",
          name: "calendar",
          meta: {
            allowAnonymous: false,
            pageTitle: "日历"
          },
          component: () => import("@/pages/calendar")
        },
        {
          path: "/chat",
          name: "chat",
          meta: {
            allowAnonymous: false,
            pageTitle: "交流"
          },
          component: () => import("@/pages/chat")
        },
        {
          path: "/setting",
          name: "setting",
          component: () => import("@/pages/setting"),
          redirect: {
            name: "base"
          },
          children: [
            {
              path: "/setting/base",
              name: "base",
              meta: {
                allowAnonymous: false,
                pageTitle: "基本设置"
              },
              component: () => import("@/components/settings/baseSetting")
            },
            {
              path: "/setting/safe",
              name: "safe",
              meta: {
                allowAnonymous: false,
                pageTitle: "安全设置"
              },
              component: () => import("@/components/settings/safeSetting")
            },
            {
              path: "/setting/bind",
              name: "bind",
              meta: {
                allowAnonymous: false,
                pageTitle: "绑定设置"
              },
              component: () => import("@/components/settings/bindSetting")
            },
            {
              path: "/setting/company",
              name: "company",
              meta: {
                allowAnonymous: false,
                pageTitle: "公司设置"
              },
              component: () => import("@/components/settings/companySetting")
            }
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
                allowAnonymous: false,
                pageTitle: "首页"
              },
              component: () => import("@/components/workbench/home")
            },
            {
              path: "/workbench/mission",
              name: "mission",
              meta: {
                allowAnonymous: false,
                pageTitle: "任务"
              },
              component: () => import("@/components/workbench/missions")
            }
          ]
        },
        {
          path: "/document",
          name: "document",
          component: () => import("@/pages/document"),
          children: [
            {
              path: "/document/list",
              name: "document_list",
              meta: {
                allowAnonymous: false,
                pageTitle: "文档列表"
              },
              component: () =>
                import("@/components/workbench/drawerTabs/document/list")
            },
            {
              path: "/document/add",
              name: "document_add",
              meta: {
                allowAnonymous: false,
                pageTitle: "写文档"
              },
              component: () =>
                import("@/components/workbench/drawerTabs/document/add")
            },
            {
              path: "/document/:id",
              name: "document_detail",
              meta: {
                allowAnonymous: false,
                pageTitle: "文档详情"
              },
              component: () =>
                import("@/components/workbench/drawerTabs/document/detail")
            }
          ]
        },
        {
          path: "/pan",
          name: "pans",
          meta: {
            allowAnonymous: false,
            pageTitle: "云盘"
          },
          component: () =>
            import("@/components/workbench/drawerTabs/pan/list")
        }
      ]
    },
    {
      path: "*",
      name: "err404",
      meta: {
        allowAnonymous: true,
        pageTitle: "4 0 4!"
      },
      component: () => import("@/pages/error/404")
    }
  ]
});

routerConfig.beforeEach((to, from, next) => {
  store.commit("CHANGE_ROUTE", to.name);
  if (!to.meta.allowAnonymous && !localStorage.getItem("token")) {
    document.title = "登录";
    next("login");
  }
  document.title = to.meta.pageTitle;
  next();
});

export default routerConfig;
