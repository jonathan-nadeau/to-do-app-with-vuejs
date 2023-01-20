<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ToDoService } from "@/services";
import type { ITodo } from "@/typescript/interfaces/ITodo";
import { Card } from "@/components";

const toDoService = new ToDoService();

onMounted(async () => {
  const response = await toDoService.getTodos();
  if (response.success && response.todos) {
    todos.value = response.todos;
  }
});

const todos = ref<ITodo[]>([]);
const filters = ref<Array<{ label: string; isChecked: boolean }>>([
  {
    label: "Done",
    isChecked: false,
  },
  {
    label: "Expired",
    isChecked: false,
  },
  {
    label: "Todo",
    isChecked: false,
  },
  {
    label: "No time limit",
    isChecked: false,
  },
]);
</script>

<template>
  <section>
    <div class="inputWrapper">
      <template v-for="filter in filters"
        ><label>
          <input type="checkbox" v-model="filter.isChecked" />
          {{ filter.label }}
        </label>
      </template>
    </div>
    <ul>
      <li v-for="todo in todos">
        <Card :todo="todo" />
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
section {
  padding: calc(115px + 2rem) 1rem 2rem;
}

.inputWrapper {
  display: flex;
  justify-content: space-around;
  column-gap: 2rem;
  margin-bottom: 2rem;

  label {
    display: flex;
    align-items: center;
    column-gap: 1rem;
  }
}

input {
  width: 0.5rem;
  height: 0.5rem;
  border: 1px solid black;
}
</style>
