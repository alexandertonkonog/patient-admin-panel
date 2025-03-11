import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  LoginRequest,
  LoginResponse,
  RequestPasswordResetDto,
  ResetPasswordDto,
} from "./models";
import { UserRole } from "../users";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    credentials: "include",
  }),

  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      // query: (credentials) => ({
      //   url: "/auth/login",
      //   method: "POST",
      //   body: credentials,
      // }),
      queryFn: async (credentials) => {
        // Имитируем успешный ответ
        return {
          data: {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6Ik",
            user: {
              id: 1,
              login: credentials.login,
              role: credentials.role || UserRole.GNATHOLOGIST,
            },
          },
        };
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    requestPasswordReset: builder.mutation<void, RequestPasswordResetDto>({
      query: (data) => ({
        url: "/auth/password/reset-request",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation<void, ResetPasswordDto>({
      query: (data) => ({
        url: "/auth/password/reset",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
