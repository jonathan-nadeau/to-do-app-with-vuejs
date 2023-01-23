<script setup lang="ts">
import { RouterLink } from "vue-router";
import { ref, onUpdated } from "vue";
import { AuthService } from "@/services";
import { TextField, Button, Spinner } from "@/components";
import router from "@/router";

const authService = new AuthService();

const handleClick = async (event: MouseEvent) => {
  event.preventDefault();
  if (!!email.value && !!password.value) {
    isLoading.value = true;
    const { login } = authService;
    const response = await login(email.value, password.value);
    isLoading.value = false;
    if (!response.success) {
      loginError.value = response.error;
    } else {
      router.push("dashboard");
    }
  }
};

const isLoading = ref<boolean>(false);
const email = ref<string>("");
const password = ref<string>("");
const loginError = ref<any>(null);
</script>

<template>
  <div class="Login">
    <h1>Login</h1>
    <form class="Login__form">
      <label>
        Email
        <TextField v-model="email" required />
      </label>

      <label
        >Password
        <TextField v-model="password" required type="password" />
      </label>

      <Button label="Login" @click="handleClick" />
      <p class="Login__textError" v-if="loginError">{{ loginError }}</p>

      <div>
        <p>Don't have an account?</p>
        <router-link to="/signup">Register</router-link>
      </div>
    </form>
  </div>
  <div class="spinner" v-if="isLoading">
    <Spinner />
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/sass/boxShadow.scss";
@import "@/assets/sass/colors.scss";

.spinner {
  height: 100vh;
}
.Login {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  &__form {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    row-gap: 1.25rem;
    width: 350px;

    border-radius: 0.5rem;
    @include boxShadow;

    label {
      display: flex;
      flex-direction: column;
      row-gap: 0.5rem;
    }
  }

  a {
    color: $indigo500;
    text-decoration: underline;
  }

  &__textError {
    color: $red500;
    font-size: 0.75rem;
  }
}
</style>
