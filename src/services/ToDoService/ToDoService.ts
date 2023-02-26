import { API_URL, API_TOKEN } from "@/constants";
import type { ITodo } from "@/typescript/interfaces/ITodo";
import { todoEvents, todoObserver } from "./todoObserver";
import type { Events } from "@/utils/Observer";
import { sortTodos } from "@/utils";

class ToDoService {
  private token = API_TOKEN as string;

  userId = localStorage.getItem("userId") || "";
  url = API_URL + `todos`;
  headers = {
    "Content-Type": "application/json",
    Authorization: this.token,
  };
  events: Events = todoEvents;
  observer = todoObserver;

  constructor() {}

  async getTodos() {
    try {
      const response = await fetch(`${this.url}/all/${this.userId}`, {
        method: "GET",
        headers: this.headers,
      });

      if (!response.ok) throw new Error(response.statusText);

      const json = await response.json();

      if (!json.success) throw new Error(json.errors[0].message);

      const todos = json.data;

      this.observer.publish(this.events.onGetTodos, {
        success: true,
        todos: sortTodos(todos),
      });
    } catch (error) {
      this.observer.publish(this.events.onGetTodos, { success: false, error });
    }
  }
  async getTodoById(id: string) {
    try {
      const response = await fetch(`${this.url}/${id}`, {
        method: "GET",
        headers: this.headers,
      });

      if (!response.ok) throw new Error(response.statusText);

      const json = await response.json();

      if (!json.success) throw new Error(json.errors[0].message);

      const todo = json.data;

      this.observer.publish(this.events.onGetTodoById, { success: true, todo });
    } catch (error) {
      this.observer.publish(this.events.onGetTodoById, {
        success: false,
        error,
      });
    }
  }
  async addTodo(todoToAdd: Partial<ITodo>) {
    try {
      const response = await fetch(`${this.url}`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({ input: { ...todoToAdd, user: this.userId } }),
      });

      if (!response.ok) throw new Error(response.statusText);

      const json = await response.json();

      if (!json.success) throw new Error(json.errors[0].message);

      const todo = json.data;

      this.observer.publish(this.events.onAddTodo, { success: true, todo });
    } catch (error) {
      this.observer.publish(this.events.onAddTodo, { success: false, error });
    }
  }

  async updateTodo(id: string, todoToUpdate: Partial<ITodo>) {
    try {
      const response = await fetch(`${this.url}/${id}`, {
        method: "PATCH",
        headers: this.headers,
        body: JSON.stringify({ _id: id, input: todoToUpdate }),
      });

      if (!response.ok) throw new Error(response.statusText);

      const json = await response.json();

      if (!json.success) throw new Error(json.errors[0].message);

      const todo = json.data;

      this.observer.publish(this.events.onUpdateTodo, {
        success: true,
        todo,
      });
    } catch (error) {
      this.observer.publish(this.events.onUpdateTodo, {
        success: false,
        error,
      });
    }
  }
  async deleteTodo(id: string) {
    try {
      const response = await fetch(`${this.url}/${id}`, {
        method: "DELETE",
        headers: this.headers,
      });

      if (!response.ok) throw new Error(response.statusText);

      this.observer.publish(this.events.onDeleteTodo, { success: true });
    } catch (error) {
      this.observer.publish(this.events.onDeleteTodo, {
        success: false,
        error,
      });
    }
  }
}

export default ToDoService;
