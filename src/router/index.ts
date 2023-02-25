import { LoginView, SignupView, DashboardView } from "@/views";
import { AuthService } from "@/services";
import {
  createRouter,
  createWebHistory,
  type RouteRecordName,
  type RouteRecordRaw,
} from "vue-router";

const authService = AuthService;

const routes: RouteRecordRaw[] = [
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignupView,
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/login",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  const isAuthenticate = await authService.authenticate();
  const publicRoutes: Array<{ name: RouteRecordName }> = [
    { name: "login" },
    { name: "signup" },
  ];

  if (publicRoutes.every((publicRoute) => publicRoute.name !== to.name)) {
    if (isAuthenticate.error) return { name: "login" };
  }

  if (to.name === "login") {
    if (isAuthenticate.success) return { name: "dashboard" };
  }
});

export default router;
