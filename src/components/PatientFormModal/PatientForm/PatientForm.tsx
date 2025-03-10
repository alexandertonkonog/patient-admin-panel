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
  Grid2 as Grid,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { LineChart } from "@mui/x-charts/LineChart";
import { PatientFormData, PatientFormProps } from "./models";
import {
  TEETH_OPTIONS,
  GUMS_OPTIONS,
  BITE_OPTIONS,
  TMJ_OPTIONS,
  MUSCLES_OPTIONS,
} from "./consts";

export const PatientForm: React.FC<PatientFormProps> = ({
  defaultValues,
  onSubmit,
  mode,
  isLoading,
  onClose,
  isError,
}) => {
  const [isEditing, setIsEditing] = useState(false);
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ height: "100%" }}>
      <Stack spacing={3} sx={{ height: "100%" }}>
        {isError && (
          <Alert severity="error">Произошла ошибка при сохранении данных</Alert>
        )}

        <Card sx={{ flex: "0 0 auto" }}>
          <CardContent>
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
                  <Typography variant="h6">
                    {firstName || "Имя не указано"}
                  </Typography>
                  <Typography variant="h6">
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
          </CardContent>
        </Card>

        <Grid container spacing={2} sx={{ flex: 1, minHeight: 0 }}>
          <Grid xs={12} md={6} lg={4} sx={{ display: "flex" }}>
            <Card sx={{ width: "100%" }}>
              <CardContent>
                <Box sx={{ height: 200 }}>
                  <LineChart
                    series={[
                      {
                        data: [2, 5.5, 2, 8.5, 1.5, 5],
                      },
                    ]}
                    height={200}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid xs={12} md={6} lg={4} sx={{ display: "flex" }}>
            <Card sx={{ width: "100%" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Состояние зубов
                </Typography>
                <Stack spacing={1}>
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
              </CardContent>
            </Card>
          </Grid>

          <Grid xs={12} md={6} lg={4} sx={{ display: "flex" }}>
            <Card sx={{ width: "100%" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Состояние десен
                </Typography>
                <Stack spacing={1}>
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
              </CardContent>
            </Card>
          </Grid>

          <Grid xs={12} md={6} lg={4} sx={{ display: "flex" }}>
            <Card sx={{ width: "100%" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Состояние прикуса
                </Typography>
                <Stack spacing={1}>
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
              </CardContent>
            </Card>
          </Grid>

          <Grid xs={12} md={6} lg={4} sx={{ display: "flex" }}>
            <Card sx={{ width: "100%" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  ВНЧС
                </Typography>
                <Stack spacing={1}>
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
              </CardContent>
            </Card>
          </Grid>

          <Grid xs={12} md={6} lg={4} sx={{ display: "flex" }}>
            <Card sx={{ width: "100%" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Состояние мышц
                </Typography>
                <Stack spacing={1}>
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
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "flex-end",
            flex: "0 0 auto",
          }}
        >
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
      </Stack>
    </form>
  );
};
