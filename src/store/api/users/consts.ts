import { UserRole } from "./enums";

export const USER_ROLE_LABELS: Record<UserRole, string> = {
  [UserRole.ADMIN]: "Администратор",
  [UserRole.ORTHOPEDIST]: "Ортопед",
  [UserRole.GNATHOLOGIST]: "Гнатолог",
};
