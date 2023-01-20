<script setup lang="ts">
import type { ITodo } from "@/typescript/interfaces/ITodo";
import { CheckCircleIcon } from "@heroicons/vue/24/solid";
import { ref } from "vue";

interface Props {
  todo: ITodo;
}
const { todo } = defineProps<Props>();
const date = ref<string>(
  new Date(todo.timeLimit).toLocaleDateString("en-CA", { dateStyle: "long" })
);
</script>

<template>
  <div>
    <p class="title">
      {{ todo.title }}
      <button :class="todo.done ? 'done' : ''"><CheckCircleIcon /></button>
    </p>
    <p class="time">Time limit : {{ date }}</p>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/sass/boxShadow.scss";

div {
  width: 300px;
  @include boxShadowLight;
  border-radius: 0.5rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  cursor: pointer;
  transition: box-shadow 300ms ease-in-out;

  &:hover {
    @include boxShadow;
  }
}

.title {
  font-size: 14px;
  font-weight: 700;
  display: flex;
  justify-content: space-between;
}

button {
  width: 1rem;
  height: 1rem;
  cursor: pointer;
}
</style>
