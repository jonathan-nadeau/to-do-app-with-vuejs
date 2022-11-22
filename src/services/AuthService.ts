import { API_TOKEN, API_URL } from "@/constants";

class AuthService {
  url = API_URL;
  token = API_TOKEN;

  constructor() {}

  login(/* object to be defined */) {}
  logout() {}
  getUser(id: number) {}
}

export default AuthService;
