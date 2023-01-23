<script setup lang="ts">
import { RouterLink } from "vue-router";
import { ref } from "vue";
import { AuthService } from "@/services";
import { TextField, Button, Spinner } from "@/components";
import router from "@/router";

const authService = new AuthService();

const handleClick = async (event: MouseEvent) => {
  event.preventDefault();
  if (!!email.value && !!password.value) {
    isLoading.value = true;
    const { signup } = authService;
    const response = await signup(email.value, password.value);
    isLoading.value = false;
    if (!response.success) {
      signupError.value = response.error;
    }
    if (response.success) {
      router.push({ name: "dashboard", replace: true });
    }
  }
};

const isLoading = ref<boolean>(false);
const email = ref<string>("");
const password = ref<string>("");
const signupError = ref<any>(null);
</script>

<template>
  <div class="Signup">
    <h1>Signup</h1>
    <form class="Signup__form">
      <label>
        Email
        <TextField v-model="email" required />
      </label>

      <label
        >Password
        <TextField v-model="password" required type="password" />
      </label>

      <Button label="Signup" @click="handleClick" />
      <p class="Signup__textError" v-if="signupError">{{ signupError }}</p>

      <div>
        <p>Don't have an account?</p>
        <router-link to="/login">Login</router-link>
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
.Signup {
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
