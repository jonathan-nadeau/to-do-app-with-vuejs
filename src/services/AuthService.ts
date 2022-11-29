import {
  API_TOKEN,
  API_URL,
  LOCALSTORAGE_ITEM_NAME,
  NO_USER_CONNECTED_ERROR_MESSAGE,
} from "@/constants";
import type { IUser } from "../typescript";

class AuthService {
  url = API_URL as RequestInfo;
  token = API_TOKEN as string;

  constructor() {}

  async signup(email: string, password: string) {
    try {
      const response = await fetch(`${this.url}users/signupWithPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: this.token,
        },
        body: JSON.stringify({ email, password, username: email }),
      });

      if (!response.ok) throw new Error(response.statusText);

      const json = await response.json();

      if (!json.success) throw new Error(json.errors[0].message);

      const user = json.data as IUser;

      localStorage.setItem(LOCALSTORAGE_ITEM_NAME, user.token);

      return { success: true };
    } catch (error) {
      return { succes: false, error };
    }
  }

  async login(email: string, password: string) {
    try {
      const response = await fetch(`${this.url}users/loginWithPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: this.token,
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error(response.statusText);

      const json = await response.json();

      if (!json.success) throw new Error(json.errors[0].message);
      const user = json.data as IUser;

      localStorage.setItem(LOCALSTORAGE_ITEM_NAME, user.token);

      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  }

  logout(): void | string {
    const userToken = localStorage.getItem(LOCALSTORAGE_ITEM_NAME);

    if (!userToken) return NO_USER_CONNECTED_ERROR_MESSAGE;

    localStorage.removeItem(LOCALSTORAGE_ITEM_NAME);
  }

  async authenticate() {
    try {
      const userToken = localStorage.getItem(LOCALSTORAGE_ITEM_NAME);

      if (!userToken) throw new Error(NO_USER_CONNECTED_ERROR_MESSAGE);

      const response = await fetch(`${this.url}users/authenticate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: this.token,
        },
        body: JSON.stringify({ toker: userToken }),
      });

      if (!response.ok) throw new Error(response.statusText);

      const json = await response.json();

      if (!json.success) throw new Error(json.errors[0].message);

      const user = json.data as IUser;
      localStorage.setItem("todo_token", user.token);

      return { success: true, user };
    } catch (error) {
      return { success: false, error };
    }
  }
}

export default AuthService;
