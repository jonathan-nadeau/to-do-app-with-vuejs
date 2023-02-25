import { API_URL, API_TOKEN } from "@/constants";
import type { ITodo } from "@/typescript/interfaces/ITodo";
import type { LocationQueryValue } from "vue-router";

class ToDoService {
  userId = localStorage.getItem("userId") || "";
  url = API_URL + `todos`;
  private token = API_TOKEN as string;
  headers = {
    "Content-Type": "application/json",
    Authorization: this.token,
  };

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

      return { success: true, todos };
    } catch (error) {
      return { success: false, error };
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

      return { success: true, todo };
    } catch (error) {
      return { success: false, error };
    }
  }
  async addTodo(todo: Partial<ITodo>) {
    try {
      const response = await fetch(`${this.url}`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({ input: { ...todo, user: this.userId } }),
      });

      if (!response.ok) throw new Error(response.statusText);

      const json = await response.json();

      if (!json.success) throw new Error(json.errors[0].message);

      return { success: true, todo: json.data };
    } catch (error) {
      return { success: false, error };
    }
  }

  async updateTodo(id: string, todo: Partial<ITodo>) {
    try {
      const response = await fetch(`${this.url}/${id}`, {
        method: "PATCH",
        headers: this.headers,
        body: JSON.stringify({ _id: id, input: todo }),
      });

      if (!response.ok) throw new Error(response.statusText);

      const json = await response.json();

      if (!json.success) throw new Error(json.errors[0].message);

      return { success: true, todo: json.data };
    } catch (error) {
      return { success: false, error };
    }
  }
  async deleteTodo(id: string) {
    try {
      const response = await fetch(`${this.url}/${id}`, {
        method: "DELETE",
        headers: this.headers,
      });

      if (!response.ok) throw new Error(response.statusText);

      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  }
}

export default ToDoService;
