import { UserRole } from "./enums";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  isActive: boolean;
}

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
}

export interface UpdateUserRequest extends CreateUserRequest {
  id: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  perPage: number;
}

export type PaginatedUsers = PaginatedResponse<User>;

export interface GetUsersParams {
  page?: number;
  perPage?: number;
}
