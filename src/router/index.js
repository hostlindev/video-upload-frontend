import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import role from "@/plugins/role";
import Auth from "@/plugins/router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: {
        role: [],
      },
    },
    {
      path: "/",
      redirect: "/upload",
    },
    {
      path: "/",
      name: "home",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/HomeView.vue"),
      children: [
        {
          path: "/upload",
          name: "upload",
          component: () => import("../views/UploadView.vue"),
          meta: {
            public: false,
            requireAuth: true,
            role: [role.user],
          },
        },
        {
          path: "/list",
          name: "list",
          component: () => import("../views/VideoListView.vue"),
          meta: {
            public: false,
            requireAuth: true,
            role: [role.admin],
          },
        },
      ],
    },
    {
      path: "/:catchAll(.*)",
      name: "not-found",
      // Puedes redirigir a una vista de 404 personalizada
      // component: NotFoundView
      // O redirigir a la página de inicio
      redirect: "/upload",
    },
    /* {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    } */
  ],
});

/* router.beforeEach((to, from, next) => {
  const isAuthenticated = () => {
    const token = Auth.getToken();
    return !!token;
  };

  if (to.name !== "Login" && !isAuthenticated) next({ name: "Login" });
  else next();
}); */

export default router;
