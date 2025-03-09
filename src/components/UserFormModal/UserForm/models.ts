import { UserRole } from "Store/api/users";

export interface UserFormData {
  /** Имя пользователя */
  firstName: string;
  /** Фамилия пользователя */
  lastName: string;
  /** Email пользователя */
  email: string;
  /** Роль пользователя */
  role: UserRole;
}

export interface IProps {
  /** Начальные значения формы */
  defaultValues: UserFormData;
  /** Обработчик отправки формы */
  onSubmit: (data: UserFormData) => void;
  /** Режим работы формы */
  mode: "create" | "edit";
  /** Флаг загрузки */
  isLoading?: boolean;
  /** Обработчик закрытия формы */
  onClose: () => void;
  /** Флаг наличия ошибки */
  isError?: boolean;
}
