import React from "react";
import { CircularProgress } from "@mui/material";
import { UserForm, UserFormData } from "../UserForm";
import { IProps } from "./models";
import { useGetUserByIdQuery, useUpdateUserMutation } from "Store/api/users";

export const UserEditContent: React.FC<IProps> = ({ userId, onClose }) => {
  const {
    data: user,
    isLoading: isLoadingUser,
    isError: isErrorUser,
    isSuccess: isSuccessUser,
  } = useGetUserByIdQuery(userId);
  const [updateUser, { isLoading: isUpdating, isError }] =
    useUpdateUserMutation();

  const handleSubmit = (data: UserFormData) => {
    updateUser({ id: userId, ...data });
  };

  if (isLoadingUser) {
    return <CircularProgress />;
  }

  if (isErrorUser || !isSuccessUser) {
    return null;
  }

  return (
    <UserForm
      defaultValues={user}
      onSubmit={handleSubmit}
      mode="edit"
      isLoading={isUpdating}
      onClose={onClose}
      isError={isError}
    />
  );
};
