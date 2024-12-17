"use client";

import {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  User,
} from "@/types/auth";
import { createContext, useContext, useEffect, useState } from "react";
import * as authService from "@/services/auth";
import { getStore, removeStore, setStore } from "@/lib/store";

interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      // 检查本地存储中的用户信息
      const token = await getStore("token");
      const storedUser = await getStore("user");

      if (token && storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error("Failed to parse stored user:", error);
          // 如果解析失败，清除存储的数据
          await removeStore("token");
          await removeStore("user");
        }
      }

      setIsLoading(false);
    })();
  }, []);

  const handleAuthResponse = async (response: AuthResponse) => {
    if (response.token && response.user) {
      await setStore("token", response.token);
      await setStore("user", JSON.stringify(response.user));
      setUser(response.user);
    } else {
      throw new Error("Invalid authentication response");
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await authService.login(credentials);
      handleAuthResponse(response);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    try {
      const response = await authService.register(credentials);
      handleAuthResponse(response);
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const logout = () => {
    removeStore("token");
    removeStore("user");
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
