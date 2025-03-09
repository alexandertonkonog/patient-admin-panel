import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  GetUsersParams,
  PaginatedUsers,
  CreateUserRequest,
  UpdateUserRequest,
  User,
} from "./models";

const roles = ["admin", "manager", "user"] as const;

// Моковые данные
let mockUsers = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  firstName: `Имя ${index + 1}`,
  lastName: `Фамилия ${index + 1}`,
  email: `user${index + 1}@example.com`,
  role: roles[Math.floor(Math.random() * roles.length)],
  isActive: true,
}));

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    credentials: "include",
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getUsers: builder.query<PaginatedUsers, GetUsersParams>({
      queryFn: (params) => {
        const page = params?.page ?? 1;
        const perPage = params?.perPage ?? 10;
        const start = (page - 1) * perPage;
        const end = start + perPage;
        const items = mockUsers.slice(start, end);

        return {
          data: {
            items,
            total: mockUsers.length,
            page,
            perPage,
          },
        };
      },
      providesTags: ["Users"],
    }),
    getUserById: builder.query<User, number>({
      queryFn: (id) => {
        const user = mockUsers.find((u) => u.id === id);
        if (!user) {
          return { error: { status: 404, data: "User not found" } };
        }
        return { data: user };
      },
      providesTags: (_, __, id) => [{ type: "Users", id }],
    }),
    createUser: builder.mutation<User, CreateUserRequest>({
      queryFn: (data) => {
        const newUser = {
          ...data,
          id: mockUsers.length + 1,
          isActive: true,
        };
        mockUsers.push(newUser);
        return { data: newUser };
      },
      invalidatesTags: ["Users"],
    }),
    updateUser: builder.mutation<User, UpdateUserRequest>({
      queryFn: ({ id, ...data }) => {
        const index = mockUsers.findIndex((user) => user.id === id);
        if (index === -1) {
          return { error: { status: 404, data: "User not found" } };
        }
        const updatedUser = { ...mockUsers[index], ...data };
        mockUsers[index] = updatedUser;
        return { data: updatedUser };
      },
      invalidatesTags: ["Users"],
    }),
    removeUsers: builder.mutation<void, number[]>({
      queryFn: (ids) => {
        mockUsers = mockUsers.filter((user) => !ids.includes(user.id));
        return { data: undefined };
      },
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useRemoveUsersMutation,
} = usersApi;
