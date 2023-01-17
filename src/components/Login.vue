<script setup lang="ts">
import { RouterLink } from "vue-router";
import { ref } from "vue";
import { AuthService } from "@/services";

const authService = new AuthService();

const handleClick = async (event: MouseEvent) => {
  event.preventDefault();
  if (!!email.value && !!password.value) {
    const { login } = authService;
    const response = await login(email.value, password.value);
    if (!response.success) {
      loginError.value = response.error;
    }
  }
};

const email = ref<string>("");
const password = ref<string>("");
const loginError = ref<any>(null);
</script>

<template>
  <main>
    <form>
      <div>
        <label for="email" hidden>Email</label>
        <input v-model="email" type="email" id="email" required />

        <label for="password" hidden></label>
        <input v-model="password" type="password" id="password" required />

        <button @click="handleClick">Login</button>
        <p v-if="loginError">{{ loginError }}</p>
      </div>
      <div>
        <p>Don't have an account?</p>
        <router-link to="/signup">Signup</router-link>
      </div>
    </form>
  </main>
</template>
