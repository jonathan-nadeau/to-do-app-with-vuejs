import { API_URL, API_TOKEN } from "@/constants";

class ToDoService {
  userId = localStorage.getItem("userId") || "";
  url = API_URL + `todos/all/${this.userId}`;
  private token = API_TOKEN as string;
  headers = {
    "Content-Type": "application/json",
    Authorization: this.token,
  };

  constructor() {}

  async getTodos() {
    try {
      const response = await fetch(this.url, {
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
  async getTodoById(id: number) {
    try {
      const response = await fetch(API_URL + id, {
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
  async addTodo(/* object to be defined */) {}
  async updateTodo(/* object to be defined */) {}
  async deleteTodo(id: number) {}
}

export default ToDoService;
