import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Stack,
  TextField,
  Button,
  Box,
  Alert,
  Card,
  CardContent,
  Typography,
  Checkbox,
  FormControlLabel,
  IconButton,
  Grid,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LockIcon from "@mui/icons-material/Lock";
import { LineChart } from "@mui/x-charts/LineChart";
import { PatientFormData, PatientFormProps } from "./models";
import {
  TEETH_OPTIONS,
  GUMS_OPTIONS,
  BITE_OPTIONS,
  TMJ_OPTIONS,
  MUSCLES_OPTIONS,
} from "./consts";
import { UserRole } from "../../../store/api/users";
import { useSelector } from "react-redux";
import { RootState } from "Store/store";

const ROLE_ACCESS = {
  [UserRole.ADMIN]: ["chart"],
  [UserRole.ORTHOPEDIST]: ["teeth", "gums", "bite", "chart"],
  [UserRole.GNATHOLOGIST]: ["tmj", "muscles", "chart"],
};

export const PatientForm: React.FC<PatientFormProps> = ({
  defaultValues,
  onSubmit,
  mode,
  isLoading,
  onClose,
  isError,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const userRole =
    useSelector((state: RootState) => state.auth.user?.role) || UserRole.ADMIN;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PatientFormData>({
    defaultValues: defaultValues || {
      firstName: "",
      lastName: "",
      teeth: {},
      gums: {},
      bite: {},
      tmj: {},
      muscles: {},
    },
  });

  const firstName = watch("firstName");
  const lastName = watch("lastName");

  const hasAccess = (section: string) => {
    return ROLE_ACCESS[userRole].includes(section);
  };

  const renderCard = (
    title: string,
    section: string,
    content: React.ReactNode
  ) => {
    const canAccess = hasAccess(section);
    return (
      <Card sx={{ width: "100%" }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            opacity: canAccess ? 1 : 0.7,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Typography variant="h6">{title}</Typography>
            {!canAccess && (
              <Tooltip title="У вас нет доступа к этому разделу">
                <LockIcon color="disabled" fontSize="small" />
              </Tooltip>
            )}
          </Box>
          {canAccess ? (
            content
          ) : (
            <Box
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography color="text.secondary">
                Доступ ограничен для вашей роли
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ height: "100%" }}>
      <Stack spacing={3} sx={{ height: "100%" }}>
        {isError && (
          <Alert severity="error">Произошла ошибка при сохранении данных</Alert>
        )}

        <Card sx={{ flex: "0 0 auto" }}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {isEditing ? (
                  <>
                    <TextField
                      size="small"
                      label="Имя"
                      {...register("firstName", { required: "Введите имя" })}
                      error={!!errors.firstName}
                      helperText={errors.firstName?.message}
                      disabled={isLoading}
                    />
                    <TextField
                      size="small"
                      label="Фамилия"
                      {...register("lastName", { required: "Введите фамилию" })}
                      error={!!errors.lastName}
                      helperText={errors.lastName?.message}
                      disabled={isLoading}
                    />
                    <IconButton
                      size="small"
                      onClick={() => setIsEditing(false)}
                      sx={{ ml: 1 }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <Typography variant="body1">
                      {firstName || "Имя не указано"}
                    </Typography>
                    <Typography variant="body1">
                      {lastName || "Фамилия не указана"}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => setIsEditing(true)}
                      sx={{ ml: 1 }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </>
                )}
              </Box>
              <Box sx={{ display: "flex", gap: 2 }}>
                {onClose && (
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={onClose}
                    disabled={isLoading}
                  >
                    Отмена
                  </Button>
                )}
                <Button
                  size="small"
                  type="submit"
                  variant="contained"
                  disabled={isLoading}
                >
                  {mode === "create" ? "Создать" : "Сохранить"}
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Grid container spacing={1} sx={{ p: 0 }}>
          <Grid item xs={12} md={6} lg={4} sx={{ display: "flex" }}>
            {renderCard(
              "График лечения",
              "chart",
              <Box sx={{ flex: 1, height: 200 }}>
                <LineChart
                  series={[
                    {
                      data: [2, 5.5, 2, 8.5, 1.5, 5],
                      label: "Болевые ощущения",
                      color: "#1976d2",
                    },
                  ]}
                  height={400}
                  xAxis={[
                    {
                      data: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн"],
                      scaleType: "band",
                    },
                  ]}
                  sx={{
                    ".MuiLineElement-root": {
                      strokeWidth: 2,
                    },
                  }}
                />
              </Box>
            )}
          </Grid>

          <Grid item xs={12} md={6} lg={4} sx={{ display: "flex" }}>
            {renderCard(
              "Состояние зубов",
              "teeth",
              <Stack spacing={1} sx={{ flex: 1 }}>
                {TEETH_OPTIONS.map((option) => (
                  <FormControlLabel
                    key={option.value}
                    control={
                      <Checkbox
                        size="small"
                        {...register(`teeth.${option.value}`)}
                        disabled={isLoading}
                      />
                    }
                    label={option.label}
                  />
                ))}
              </Stack>
            )}
          </Grid>

          <Grid item xs={12} md={6} lg={4} sx={{ display: "flex" }}>
            {renderCard(
              "Состояние десен",
              "gums",
              <Stack spacing={1} sx={{ flex: 1 }}>
                {GUMS_OPTIONS.map((option) => (
                  <FormControlLabel
                    key={option.value}
                    control={
                      <Checkbox
                        size="small"
                        {...register(`gums.${option.value}`)}
                        disabled={isLoading}
                      />
                    }
                    label={option.label}
                  />
                ))}
              </Stack>
            )}
          </Grid>

          <Grid item xs={12} md={6} lg={4} sx={{ display: "flex" }}>
            {renderCard(
              "Состояние прикуса",
              "bite",
              <Stack spacing={1} sx={{ flex: 1 }}>
                {BITE_OPTIONS.map((option) => (
                  <FormControlLabel
                    key={option.value}
                    control={
                      <Checkbox
                        size="small"
                        {...register(`bite.${option.value}`)}
                        disabled={isLoading}
                      />
                    }
                    label={option.label}
                  />
                ))}
              </Stack>
            )}
          </Grid>

          <Grid item xs={12} md={6} lg={4} sx={{ display: "flex" }}>
            {renderCard(
              "ВНЧС",
              "tmj",
              <Stack spacing={1} sx={{ flex: 1 }}>
                {TMJ_OPTIONS.map((option) => (
                  <FormControlLabel
                    key={option.value}
                    control={
                      <Checkbox
                        size="small"
                        {...register(`tmj.${option.value}`)}
                        disabled={isLoading}
                      />
                    }
                    label={option.label}
                  />
                ))}
              </Stack>
            )}
          </Grid>

          <Grid item xs={12} md={6} lg={4} sx={{ display: "flex" }}>
            {renderCard(
              "Состояние мышц",
              "muscles",
              <Stack spacing={1} sx={{ flex: 1 }}>
                {MUSCLES_OPTIONS.map((option) => (
                  <FormControlLabel
                    key={option.value}
                    control={
                      <Checkbox
                        size="small"
                        {...register(`muscles.${option.value}`)}
                        disabled={isLoading}
                      />
                    }
                    label={option.label}
                  />
                ))}
              </Stack>
            )}
          </Grid>
        </Grid>
      </Stack>
    </form>
  );
};
