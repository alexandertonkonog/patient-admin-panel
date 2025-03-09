import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginRequest, LoginResponse } from "./models";

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
              role: credentials.role || "user",
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
  }),
});
