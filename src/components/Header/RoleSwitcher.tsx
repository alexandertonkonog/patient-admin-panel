import React from "react";
import { useSelector } from "react-redux";
import { ButtonGroup, Button } from "@mui/material";
import { useLoginMutation } from "Store/api/auth";
import { selectUser } from "Store/slices/auth";

const ROLES = [
  { value: "user", label: "Пользователь" },
  { value: "manager", label: "Менеджер" },
  { value: "admin", label: "Администратор" },
] as const;

export const RoleSwitcher = () => {
  const user = useSelector(selectUser);
  const [login] = useLoginMutation();

  const handleRoleChange = (role: (typeof ROLES)[number]["value"]) => {
    if (user) {
      login({
        login: user.login,
        password: "demo",
        role,
      });
    }
  };

  return (
    <ButtonGroup size="small" aria-label="Сменить роль">
      {ROLES.map((role) => (
        <Button
          key={role.value}
          variant={user?.role === role.value ? "contained" : "outlined"}
          onClick={() => handleRoleChange(role.value)}
          title={`Переключиться на роль ${role.value}`}
        >
          {role.label}
        </Button>
      ))}
    </ButtonGroup>
  );
};
