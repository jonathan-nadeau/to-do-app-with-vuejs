<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import { ToDoService, FilterService } from "@/services";
import type { ITodo } from "@/typescript/interfaces/ITodo";
import { Card, Spinner, AddTodo, Checkbox, Todo } from "@/components";
import { useRoute, useRouter } from "vue-router";
import { sortTodos } from "@/utils";

/**
 * Service, hooks
 */
const toDoService = new ToDoService();
const router = useRouter();
const route = useRoute();
/**
 * Lifecycle function
 */

onMounted(async () => {
  const todoIdParams = route.query.id;

  if (todoIdParams) {
    detailedTodoIsShown.value = true;
  }

  await getTodos();
});

/**
 * State
 */
const isLoading = ref<boolean>(false);
const isFiltered = ref<boolean>(false);
const todos = ref<ITodo[]>([]);
const filteredTodos = ref<ITodo[]>([]);
const detailedTodoIsShown = ref<boolean>(false);
const filters = reactive<
  Array<{
    label: "Done" | "Expired" | "To do" | "No time limit" | "In time";
    isChecked: boolean;
  }>
>(
  FilterService.Builder.withLabel("Done")
    .withLabel("Expired")
    .withLabel("To do")
    .withLabel("No time limit")
    .withLabel("In time")
    .build().filters
);

/**
 * Watchers
 */

watch(filters, () => {
  if (filters.find((filter) => filter.isChecked)) {
    isFiltered.value = true;
  } else {
    isFiltered.value = false;
  }

  filters.forEach((filter) => {
    if (filter.isChecked) {
      filteredTodos.value = todos.value.filter((todo) => {
        if (filter.label === "Done") return todo.done;
        if (filter.label === "To do") return !todo.done;
        if (filter.label === "No time limit") return !todo.timeLimit;
        if (filter.label === "Expired") {
          const todoDate = new Date(todo.timeLimit);
          const currentDate = new Date();
          todoDate.setHours(0, 0, 0, 0);
          currentDate.setHours(0, 0, 0, 0);
          return todoDate < currentDate;
        }
        if (filter.label === "In time") {
          const todoDate = new Date(todo.timeLimit);
          const currentDate = new Date();
          todoDate.setHours(0, 0, 0, 0);
          currentDate.setHours(0, 0, 0, 0);
          return todoDate > currentDate && !todo.done;
        }
      });
    }
  });
});
watch(
  () => route.query.id,
  async (newId) => {
    if (!newId) {
      detailedTodoIsShown.value = false;
    }
    if (newId) {
      toDoService.getTodoById(newId.toString());
    }
  }
);

/**
 * Subscribers
 */

toDoService.observer.subscribe(
  toDoService.events.onGetTodos,
  (response: { success: boolean; todos: ITodo[] }) => {
    if (response.success) {
      todos.value = sortTodos(response.todos);
    }
  }
);

toDoService.observer.subscribe(
  toDoService.events.onUpdateTodo,
  (response: { success: boolean; todo: ITodo }) => {
    if (response.success) {
      toDoService.getTodos();
    }
  }
);

toDoService.observer.subscribe(
  toDoService.events.onAddTodo,
  (response: { success: boolean; todo: ITodo }) => {
    if (response.success) {
      toDoService.getTodos();
    }
  }
);

/**
 * Event handlers
 */
const handleAddTodoOnSubmit = async (todo: Partial<ITodo>) => {
  isLoading.value = true;
  await toDoService.addTodo(todo);
  isLoading.value = false;
};

const cardButtonOnClick = async (todo: ITodo) => {
  isLoading.value = true;
  await toDoService.updateTodo(todo._id, {
    done: !todo.done,
  });
  isLoading.value = false;
};

const handleCardOnClick = async (todoId: string) => {
  await router.push({ query: { id: todoId } });
  detailedTodoIsShown.value = true;
};

const getTodos = async () => {
  isLoading.value = true;
  await toDoService.getTodos();
  isLoading.value = false;
};

/**
 * Utils
 */
</script>

<template>
  <div v-if="isLoading" class="spinner">
    <Spinner />
  </div>
  <section v-if="!isLoading">
    <div class="row">
      <div class="inputWrapper">
        <template v-for="filter in filters">
          <Checkbox v-model="filter.isChecked" :label="filter.label" />
        </template>
      </div>
      <AddTodo @handle-submit="handleAddTodoOnSubmit" />
    </div>
    <div class="todos">
      <ul v-if="!isFiltered">
        <li v-for="todo in todos">
          <Card
            :todo="todo"
            @button-on-click="cardButtonOnClick(todo)"
            @card-on-click="handleCardOnClick"
          />
        </li>
      </ul>
      <ul v-if="isFiltered">
        <li v-for="filteredTodo in filteredTodos">
          <Card
            :todo="filteredTodo"
            @button-on-click="cardButtonOnClick(filteredTodo)"
            @card-on-click="handleCardOnClick"
          />
        </li>
      </ul>
      <Todo v-if="detailedTodoIsShown" />
    </div>
  </section>
</template>

<style scoped lang="scss">
@import "src/assets/sass/colors.scss";
@import "src/assets/sass/boxShadow.scss";
@import "src/assets/sass/scrollbar.scss";

section {
  height: 100vh;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  padding: 115px 1rem 0;
}

.row {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid $grey300;
  padding: 2rem 0;
}

.spinner {
  height: calc(100vh - 115px);
  overflow: hidden;
}

.inputWrapper {
  display: flex;
  justify-content: space-around;
  align-items: center;
  column-gap: 2rem;
  cursor: pointer;
}

ul {
  height: 100%;
  width: fit-content;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  padding-top: 2rem;
  padding-right: 1rem;
  padding-bottom: 2rem;
  overflow-y: auto;
  @include scrollbar;
}

.todos {
  height: 100%;
  display: flex;
}
</style>
