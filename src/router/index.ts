import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/main",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/main",
    name: "main",
    component: () => import("@/views/main/index.vue"),
    redirect: "/main/workplace",
    children: [
      {
        path: "/main/workplace",
        component: () => import("@/views/system/workplace/index.vue"),
      },
      {
        path: "/main/settings",
        component: () => import("@/views/system/system-settings/index.vue"),
      },
      {
        path: "/main/user-info",
        component: () => import("@/views/system/user-info/index.vue"),
      },
      {
        path: "/main/analysis/overview",
        component: () =>
          import("@/views/system-overview/core-technology/index.vue"),
      },
      {
        path: "/main/analysis/dashboard",
        component: () =>
          import("@/views/system-overview/product-statistics/index.vue"),
      },
      {
        path: "/main/system/user",
        component: () => import("@/views/system-manage/user-manage/index.vue"),
      },
      {
        path: "/main/system/department",
        component: () =>
          import("@/views/system-manage/department-manage/index.vue"),
      },
      {
        path: "/main/system/role",
        component: () => import("@/views/system-manage/role-manage/index.vue"),
      },
      {
        path: "/main/system/menu",
        component: () => import("@/views/system-manage/menu-manage/index.vue"),
      },

      {
        path: "/main/product/category",
        component: () =>
          import("@/views/product-center/product-category/index.vue"),
      },
      {
        path: "/main/product/goods",
        component: () =>
          import("@/views/product-center/product-info/index.vue"),
      },
      {
        path: "/main/story/chat",
        component: () => import("@/views/story/chat/index.vue"),
      },
      {
        path: "/main/story/list",
        component: () => import("@/views/story/list/index.vue"),
      },
      {
        path: "/main/:pathMatch(.*)+",
        name: "notFound",
        component: () => import("@/views/not-found/index.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  if (to.path !== "/login") {
    const token = localStorage.getItem("vue3-token");
    if (!token) {
      return "/login";
    }
  }
  // if (to.path === "/main") {
  // }
});

export default router;
