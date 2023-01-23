<script setup lang="ts">
import { ToDoService } from "@/services";
import type { ITodo } from "@/typescript/interfaces/ITodo";
import { CheckCircleIcon } from "@heroicons/vue/24/solid";
import { ref } from "vue";

interface Props {
  todo: ITodo;
}
const { todo } = defineProps<Props>();
const emit = defineEmits<{
  (e: "buttonOnClick", todo: ITodo): void;
  (e: "cardOnClick", todoId: string): void;
}>();

/** Event handlers */
const buttonOnClick = () => {
  emit("buttonOnClick", todo);
};
const cardOnClick = () => {
  emit("cardOnClick", todo._id);
};

/** Utils */
const isExpired = () => {
  const timeLimit = new Date(todo.timeLimit);
  const today = new Date();

  return timeLimit < today;
};

const date = ref<string>(
  new Date(todo.timeLimit).toLocaleDateString("en-CA", { dateStyle: "long" })
);
</script>

<template>
  <div :class="todo.done ? `done` : ``" @click="cardOnClick">
    <p class="title">
      {{ todo.title }}
      <button @click="buttonOnClick">
        <CheckCircleIcon class="checkmark" />
      </button>
    </p>
    <p v-if="todo.timeLimit" :class="`time ${isExpired() ? 'expired' : ''}`">
      Time limit : {{ date }}
    </p>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/sass/boxShadow.scss";
@import "@/assets/sass/colors.scss";

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

  .expired {
    color: $red500;
  }
  .checkmark {
    color: $grey500;
  }

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

  &:hover {
    .checkmark {
      transform: scale(1.3);
    }
  }
}

.done {
  color: $grey500;
  .checkmark {
    color: $greenA400;
  }

  .expired {
    color: $grey500;
  }
}
</style>
