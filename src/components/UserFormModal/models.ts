export interface IProps {
  /** Флаг открытия модального окна */
  open: boolean;
  /** Callback закрытия модального окна */
  onClose: () => void;
  /** Режим работы модального окна */
  mode?: "create" | "edit";
  /** ID пользователя для редактирования */
  userId: number | null;
}
