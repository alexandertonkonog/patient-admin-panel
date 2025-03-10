export interface PatientFormData {
  /** Имя пациента */
  firstName: string;
  /** Фамилия пациента */
  lastName: string;
  /** Состояние зубов */
  teeth: {
    [key: string]: boolean;
  };
  /** Состояние десен */
  gums: {
    [key: string]: boolean;
  };
  /** Состояние прикуса */
  bite: {
    [key: string]: boolean;
  };
  /** Состояние височно-нижнечелюстного сустава */
  tmj: {
    [key: string]: boolean;
  };
  /** Состояние мышц */
  muscles: {
    [key: string]: boolean;
  };
}

export interface PatientFormProps {
  /** Начальные значения формы */
  defaultValues?: PatientFormData;
  /** Обработчик отправки формы */
  onSubmit: (data: PatientFormData) => void;
  /** Режим работы формы */
  mode: "create" | "edit";
  /** Флаг загрузки */
  isLoading?: boolean;
  /** Обработчик закрытия формы */
  onClose?: () => void;
  /** Флаг наличия ошибки */
  isError?: boolean;
}
