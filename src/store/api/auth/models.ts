import { UserRole } from "../users";

export interface User {
  id: number;
  login: string;
  role: UserRole;
}

export interface LoginRequest {
  login: string;
  password: string;
  role?: UserRole;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RequestPasswordResetDto {
  email: string;
}

export interface ResetPasswordDto {
  token: string;
  newPassword: string;
}
