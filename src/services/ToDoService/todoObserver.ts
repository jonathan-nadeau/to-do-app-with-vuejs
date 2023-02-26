import type { Events } from "@/utils/Observer";
import Observer from "@/utils/Observer";

export enum todoEvents {
  onGetTodos = "onGetTodos",
  onGetTodoById = "onGetTodoById",
  onAddTodo = "onAddTodo",
  onUpdateTodo = "onUpdateTodo",
  onDeleteTodo = "onDeleteTodo",
}

export const todoObserver = new Observer(todoEvents);
