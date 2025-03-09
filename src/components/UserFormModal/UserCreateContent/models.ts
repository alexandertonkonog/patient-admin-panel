import { UserFormData } from "../UserForm";

export interface IProps {
  /** Обработчик отправки формы */
  onSubmit: (data: UserFormData) => Promise<void>;
  /** Флаг загрузки */
  isLoading?: boolean;
  /** Обработчик закрытия формы */
  onClose: () => void;
}
