import { UserRole, USER_ROLE_LABELS } from "Store/api/users";

interface Role {
  value: UserRole;
  label: string;
}

export const ROLES: Role[] = [
  {
    value: UserRole.GNATHOLOGIST,
    label: USER_ROLE_LABELS[UserRole.GNATHOLOGIST],
  },
  {
    value: UserRole.ORTHOPEDIST,
    label: USER_ROLE_LABELS[UserRole.ORTHOPEDIST],
  },
  { value: UserRole.ADMIN, label: USER_ROLE_LABELS[UserRole.ADMIN] },
];
