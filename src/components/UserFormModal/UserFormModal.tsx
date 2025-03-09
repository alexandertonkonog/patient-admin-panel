import React from "react";
import { Modal } from "../Modal";
import { UserCreateContent } from "./UserCreateContent";
import { UserEditContent } from "./UserEditContent";
import { IProps } from "./models";

export const UserFormModal: React.FC<IProps> = (props) => {
  const { open, onClose, mode = "create", userId } = props;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={
        mode === "create"
          ? "Создание пользователя"
          : "Редактирование пользователя"
      }
    >
      {mode === "create" ? (
        <UserCreateContent onClose={onClose} />
      ) : (
        <UserEditContent userId={userId!} onClose={onClose} />
      )}
    </Modal>
  );
};
