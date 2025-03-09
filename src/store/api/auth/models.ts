export interface User {
  id: number;
  login: string;
  role: "admin" | "manager" | "user";
}

export interface LoginRequest {
  login: string;
  password: string;
  role?: "admin" | "manager" | "user";
}

export interface LoginResponse {
  token: string;
  user: User;
}
