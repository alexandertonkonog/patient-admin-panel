import React from "react";
import { Stack, Typography, Box, Breadcrumbs, Link } from "@mui/material";
import { Link as RouterLink, useParams } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import { useGetPatientByIdQuery } from "../store/api/patients";
import { PatientForm, PatientFormData } from "../components/PatientFormModal";

export const PatientEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: patient,
    isLoading,
    isError,
  } = useGetPatientByIdQuery(Number(id));

  const handleSubmit = (data: PatientFormData) => {
    console.log("Обновление пациента:", data);
  };

  if (isLoading) {
    return <Typography>Загрузка...</Typography>;
  }

  if (isError || !patient) {
    return <Typography>Ошибка загрузки данных пациента</Typography>;
  }

  return (
    <Stack spacing={1}>
      <Box>
        <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{ mb: 2 }}>
          <Link
            component={RouterLink}
            to="/patients"
            underline="hover"
            color="inherit"
            sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
          >
            <PersonIcon fontSize="small" />
            Пациенты
          </Link>
          <Typography
            color="text.primary"
            sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
          >
            <EditIcon fontSize="small" />
            Редактирование пациента {patient.firstName} {patient.lastName}
          </Typography>
        </Breadcrumbs>
      </Box>

      <Box>
        <PatientForm
          defaultValues={patient}
          onSubmit={handleSubmit}
          mode="edit"
        />
      </Box>
    </Stack>
  );
};
