import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        layout: "AppLayoutUser",
        requiresAuthUser: false,
        requiresAuthAdmin: false,
      }
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/AboutView.vue"),
    },
    {
      path: "/admin/login",
      name: "Admin/Auth/Login",
      component: () => import("@/views/Admin/Auth/Login.vue"),
      meta: {
        layout: "AppLayoutAdmin",
        requiresAuthUser: false,
        requiresAuthAdmin: false,
      }
    },
  ],
});

export default router;