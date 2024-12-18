import {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
} from "@/types/auth";
import { fetchApi } from "@/lib/fetch";

const auth = {
  login(credentials: LoginCredentials): Promise<AuthResponse> {
    return fetchApi<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
      showError: true,
      showSuccess: true,
      successMessage: "登录成功",
    });
  },
  register(credentials: RegisterCredentials): Promise<AuthResponse> {
    return fetchApi<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(credentials),
      showError: true,
      showSuccess: true,
      successMessage: "注册成功",
    });
  },
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};

export default auth;