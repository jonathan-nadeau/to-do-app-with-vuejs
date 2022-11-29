import { API_URL, API_TOKEN } from "@/constants";

class ToDoService {
  url = API_URL;
  token = API_TOKEN;

  constructor() {}

  async getTodos() {}
  async getTodoById(id: number) {}
  async addTodo(/* object to be defined */) {}
  async updateTodo(/* object to be defined */) {}
  async deleteTodo(id: number) {}
}

export default ToDoService;
