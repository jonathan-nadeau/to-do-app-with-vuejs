export interface ITodo {
  _id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  done: boolean;
  user: string;
  content: string;
  timeLimit: string;
}
