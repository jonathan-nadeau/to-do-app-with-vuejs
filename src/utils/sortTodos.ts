import type { ITodo } from "@/typescript";

const sortTodos = (todos: ITodo[]): ITodo[] => {
  todos.sort((a: ITodo, b: ITodo) => {
    const valueA = a.done ? 1 : 0;
    const valueB = b.done ? 1 : 0;
    return valueA - valueB;
  });

  return todos;
};

export default sortTodos;
