interface Role {
  value: "user" | "manager" | "admin";
  label: string;
}

export const ROLES: Role[] = [
  { value: "user", label: "Пользователь" },
  { value: "manager", label: "Менеджер" },
  { value: "admin", label: "Администратор" },
];
