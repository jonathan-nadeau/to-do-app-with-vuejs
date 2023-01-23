<script setup lang="ts">
import { ToDoService } from "@/services";
import type { ITodo } from "@/typescript/interfaces/ITodo";
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Button, Spinner } from "@/components";
import { TrashIcon, XMarkIcon } from "@heroicons/vue/24/solid";

const route = useRoute();
const router = useRouter();
const todoService = new ToDoService();

onMounted(async () => {
  await getTodo();
});

const todo = ref<ITodo | null>(null);
const isLoading = ref<boolean>(false);

const getTodo = async () => {
  isLoading.value = true;
  const response = await todoService.getTodoById(route.query.id as string);
  if (response.success && response.todo) {
    todo.value = response.todo;
  }

  isLoading.value = false;
};

const getLocalTime = () => {
  return (
    todo.value &&
    new Date(todo.value.timeLimit).toLocaleDateString("en-CA", {
      dateStyle: "full",
    })
  );
};

watch(
  () => route.query.id,
  async () => {
    isLoading.value = true;
    await getTodo();
    isLoading.value = false;
  }
);

const handleOnDelete = async () => {
  if (todo.value) {
    isLoading.value = true;
    console.log(todo.value._id);
    await todoService.deleteTodo(todo.value._id);
    await router.push({ name: "dashboard" });
  }
};

const handleOnClose = async () => {
  await router.push({ name: "dashboard" });
};
</script>

<template>
  <Spinner v-if="isLoading" />

  <div v-if="todo" class="todo">
    <div class="todo__header">
      <h2>{{ todo.title }}</h2>
      <Button label="" :icon="XMarkIcon"></Button>
    </div>

    <p class="todo__content"><span>Description: </span>{{ todo.content }}</p>
    <p class="todo__timeLimit"><span>Time limit:</span> {{ getLocalTime() }}</p>
    <p :class="`todo__done--${todo.done ? 'done' : 'pending'}`">
      {{ todo.done ? "Done" : "Pending" }}
    </p>
    <div class="footer">
      <Button
        color="red"
        :icon="TrashIcon"
        label="Delete item"
        @click="handleOnDelete"
      ></Button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/sass/boxShadow.scss";
@import "@/assets/sass/colors.scss";

.todo {
  @include boxShadow;
  margin: 2rem auto;
  padding: 1rem;
  height: fit-content;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    font-weight: 700;
    padding-bottom: 1rem;
    border-bottom: 1px solid $grey300;
  }

  &__content span,
  &__timeLimit span {
    font-weight: 600;
    display: flex;
    flex-direction: column;
  }

  &__done {
    font-weight: 600;

    &--done {
      color: $greenA400;
    }

    &--pending {
      color: $red500;
    }
  }
}
</style>
