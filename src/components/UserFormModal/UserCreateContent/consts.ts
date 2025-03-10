import { UserRole } from "Store/api/users";
import { UserFormData } from "../UserForm";

export const DEFAULT_VALUES: UserFormData = {
  firstName: "",
  lastName: "",
  email: "",
  role: UserRole.GNATHOLOGIST,
};
