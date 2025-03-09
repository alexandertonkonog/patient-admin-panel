import { authApi } from "./api";

export * from "./models";
export * from "./api";

export const { useLoginMutation, useLogoutMutation } = authApi;
