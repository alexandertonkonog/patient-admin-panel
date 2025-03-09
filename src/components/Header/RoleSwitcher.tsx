import React from "react";
import { useSelector } from "react-redux";
import { ButtonGroup, Button } from "@mui/material";
import { useLoginMutation } from "Store/api/auth";
import { selectUser } from "Store/slices/auth";
import { UserRole, USER_ROLE_LABELS } from "Store/api/users";

const ROLES = [
  {
    value: UserRole.GNATHOLOGIST,
    label: USER_ROLE_LABELS[UserRole.GNATHOLOGIST],
  },
  {
    value: UserRole.ORTHOPEDIST,
    label: USER_ROLE_LABELS[UserRole.ORTHOPEDIST],
  },
  { value: UserRole.ADMIN, label: USER_ROLE_LABELS[UserRole.ADMIN] },
] as const;

export const RoleSwitcher = () => {
  const user = useSelector(selectUser);
  const [login] = useLoginMutation();

  const handleRoleChange = (role: UserRole) => {
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
          title={`Переключиться на роль ${role.label}`}
        >
          {role.label}
        </Button>
      ))}
    </ButtonGroup>
  );
};
