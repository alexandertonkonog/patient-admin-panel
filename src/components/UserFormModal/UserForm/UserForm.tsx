import React from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  FormHelperText,
  Button,
  Alert,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { ROLES } from "./consts";
import { IProps, UserFormData } from "./models";

export const UserForm: React.FC<IProps> = (props) => {
  const { defaultValues, onSubmit, mode, isLoading, onClose, isError } = props;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const handleFormSubmit = async (values: UserFormData) => {
    await onSubmit(values);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Stack spacing={3} sx={{ pt: 1 }}>
        {isError && (
          <Alert severity="error" sx={{ width: "100%" }}>
            Произошла ошибка при сохранении данных
          </Alert>
        )}
        <Controller
          name="firstName"
          control={control}
          rules={{ required: "Обязательное поле" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Имя"
              size="small"
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
              autoFocus
            />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          rules={{ required: "Обязательное поле" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Фамилия"
              size="small"
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          rules={{
            required: "Обязательное поле",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Некорректный email адрес",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              type="email"
              size="small"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />
        <Controller
          name="role"
          control={control}
          rules={{ required: "Обязательное поле" }}
          render={({ field }) => (
            <FormControl size="small" error={!!errors.role}>
              <InputLabel>Роль</InputLabel>
              <Select {...field} label="Роль">
                {ROLES.map((role) => (
                  <MenuItem key={role.value} value={role.value}>
                    {role.label}
                  </MenuItem>
                ))}
              </Select>
              {errors.role && (
                <FormHelperText>{errors.role.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button onClick={onClose} disabled={isLoading}>
            Отмена
          </Button>
          <Button variant="contained" type="submit" disabled={isLoading}>
            {mode === "create" ? "Создать" : "Сохранить"}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};
