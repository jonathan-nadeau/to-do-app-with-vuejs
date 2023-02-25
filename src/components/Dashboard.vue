<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import { ToDoService, FilterService } from "@/services";
import type { ITodo } from "@/typescript/interfaces/ITodo";
import { Card, Spinner, AddTodo, Checkbox, Todo } from "@/components";
import { useRoute, useRouter } from "vue-router";

const toDoService = new ToDoService();
const router = useRouter();
const route = useRoute();

onMounted(() => {
  const todoIdParams = route.query.id;
  if (todoIdParams) {
    detailedTodoIsShown.value = true;
  }
});
onMounted(async () => {
  await getTodos();
});

const isLoading = ref<boolean>(false);
const todos = ref<ITodo[]>([]);
const filteredTodos = ref<ITodo[]>([]);
const detailedTodoIsShown = ref<boolean>(false);
const filters = FilterService.Builder.withLabel("Done")
  .withLabel("Expired")
  .withLabel("To do")
  .withLabel("No time limit")
  .withLabel("In time")
  .build();

watch(filters.filters, (newFilters) => {
  if (newFilters.every((filter) => !filter.isChecked)) {
    filteredTodos.value = todos.value;
  } else {
    filteredTodos.value = todos.value.filter((todo) => {
      for (const filter of newFilters) {
        if (filter.label === "Done" && filter.isChecked) {
          return todo.done;
        }
        if (
          filter.label === "Expired" &&
          filter.isChecked &&
          !todo.done &&
          todo.timeLimit
        ) {
          const today = new Date();
          const expirationDate = new Date(todo.timeLimit);
          return expirationDate < today;
        }
        if (filter.label === "To do" && filter.isChecked) {
          return !todo.done;
        }
        if (filter.label === "No time limit" && filter.isChecked) {
          return !todo.timeLimit;
        }
        if (filter.label === "In time" && filter.isChecked && !todo.done) {
          const today = new Date();
          const expirationDate = todo.timeLimit && new Date(todo.timeLimit);
          return !expirationDate || expirationDate > today;
        }
      }
    });
  }
});
watch(
  () => route.query.id,
  async (newId) => {
    if (!newId) {
      await getTodos();
    }
  }
);

const todosAreFiltered = () =>
  filters.filters.find((filter) => filter.isChecked);

const getTodos = async () => {
  isLoading.value = true;
  const response = await toDoService.getTodos();

  if (response.success && response.todos) {
    const data: ITodo[] = response.todos;
    data.sort((a, b) => {
      const valueA = a.done ? 1 : 0;
      const valueB = b.done ? 1 : 0;
      return valueA - valueB;
    });
    todos.value = data;
  }
  isLoading.value = false;
};

const handleAddTodoOnSubmit = async (todo: Partial<ITodo>) => {
  isLoading.value = true;

  const addResponse = await toDoService.addTodo(todo);

  if (addResponse.success) {
    const getResponse = await toDoService.getTodos();

    if (getResponse.success) {
      const data = getResponse.todos.sort((a: ITodo, b: ITodo) => {
        const valueA = a.done ? 1 : 0;
        const valueB = b.done ? 1 : 0;
        return valueA - valueB;
      });
      todos.value = data;
    }
  }
  isLoading.value = false;
};
const handleCardButtonOnClick = async (todo: ITodo) => {
  isLoading.value = true;
  if (todo) {
    const updateResponse = await toDoService.updateTodo(todo._id, {
      done: !todo.done,
    });

    if (updateResponse.success) {
      const getResponse = await toDoService.getTodos();
      if (getResponse.success) {
        const data = getResponse.todos.sort((a: ITodo, b: ITodo) => {
          const valueA = a.done ? 1 : 0;
          const valueB = b.done ? 1 : 0;
          return valueA - valueB;
        });
        todos.value = data;
      }
    }
  }
  isLoading.value = false;
};

const handleCardOnClick = async (todoId: string) => {
  await router.push({ query: { id: todoId } });
  detailedTodoIsShown.value = true;
};
</script>

<template>
  <div v-if="isLoading" class="spinner">
    <Spinner />
  </div>
  <section v-if="!isLoading">
    <div class="row">
      <div class="inputWrapper">
        <template v-for="filter in filters.filters">
          <Checkbox v-model="filter.isChecked" :label="filter.label" />
        </template>
      </div>
      <AddTodo @handle-submit="handleAddTodoOnSubmit" />
    </div>
    <div class="todos">
      <ul v-if="!todosAreFiltered()">
        <li v-for="todo in todos">
          <Card
            :todo="todo"
            @button-on-click="handleCardButtonOnClick"
            @card-on-click="handleCardOnClick"
          />
        </li>
      </ul>
      <ul v-if="todosAreFiltered()">
        <li v-for="filteredTodo in filteredTodos">
          <Card
            :todo="filteredTodo"
            @button-on-click="handleCardButtonOnClick"
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
