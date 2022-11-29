import { AuthService } from "@/services";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const authService = new AuthService();

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach(async (to, from) => {
  const userIsAuthenticate = await authService.authenticate();

  if (!userIsAuthenticate.success) return "/login";
});

export default router;
