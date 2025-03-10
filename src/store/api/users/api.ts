import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  GetUsersParams,
  PaginatedUsers,
  CreateUserRequest,
  UpdateUserRequest,
  User,
} from "./models";
import { users } from "./mocks";

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
        const items = users.slice(start, end);

        return {
          data: {
            items,
            total: users.length,
            page,
            perPage,
          },
        };
      },
      providesTags: ["Users"],
    }),
    getUserById: builder.query<User, number>({
      queryFn: (id) => {
        const user = users.find((u) => u.id === id);
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
          id: users.length + 1,
          isActive: true,
        };
        users.push(newUser);
        return { data: newUser };
      },
      invalidatesTags: ["Users"],
    }),
    updateUser: builder.mutation<User, UpdateUserRequest>({
      queryFn: ({ id, ...data }) => {
        const index = users.findIndex((user) => user.id === id);
        if (index === -1) {
          return { error: { status: 404, data: "User not found" } };
        }
        const updatedUser = { ...users[index], ...data };
        users[index] = updatedUser;
        return { data: updatedUser };
      },
      invalidatesTags: ["Users"],
    }),
    removeUsers: builder.mutation<void, number[]>({
      queryFn: (ids) => {
        // mockUsers = users.filter((user) => !ids.includes(user.id));
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
