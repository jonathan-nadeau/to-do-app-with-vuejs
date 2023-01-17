import { LoginView, HomeView } from "@/views";
import { AuthService } from "@/services";
import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

const authService = new AuthService();

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  const isAuthenticate = await authService.authenticate();

  if (!isAuthenticate.success && to.name !== "login") {
    return { name: "login" };
  }
});

export default router;
