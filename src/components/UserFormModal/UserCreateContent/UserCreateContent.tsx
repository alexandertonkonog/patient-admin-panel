import React from "react";
import { UserForm, UserFormData } from "../UserForm";
import { IProps } from "./models";
import { useCreateUserMutation } from "Store/api/users";
import { DEFAULT_VALUES } from "./consts";

export const UserCreateContent: React.FC<IProps> = ({ onClose }) => {
  const [createUser, { isLoading: isCreating, isError }] =
    useCreateUserMutation();

  const handleSubmit = (data: UserFormData) => {
    createUser(data);
  };

  return (
    <UserForm
      defaultValues={DEFAULT_VALUES}
      onSubmit={handleSubmit}
      mode="create"
      isLoading={isCreating}
      onClose={onClose}
      isError={isError}
    />
  );
};
