<script setup lang="ts">
import { Dashboard, Button } from "@/components";
import { AuthService } from "@/services";
import { useRouter } from "vue-router";

const userEmail = localStorage.getItem("userEmail") || "";
const router = useRouter();
const authService = AuthService;

const handleOnClick = () => {
  authService.logout();
  router.push("login");
};
</script>

<template>
  <main>
    <nav>
      <Button :label="`Logout ${userEmail}`" @click="handleOnClick" />
    </nav>
    <Dashboard />
  </main>
</template>

<style scoped lang="scss">
@import "@/assets/sass/colors.scss";
@import "@/assets/sass/boxShadow.scss";

nav {
  position: fixed;
  width: 100%;
  padding: 2rem 1rem;
  background-color: #fff;
  z-index: 999;
  @include boxShadowLight;
}

button {
  cursor: pointer;
  color: #fff;
  background-color: $indigo500;
  padding: 1rem;
  border-radius: 0.25rem;
}
</style>
