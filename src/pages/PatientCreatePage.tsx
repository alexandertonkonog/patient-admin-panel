import React from "react";
import { Stack, Typography, Box, Breadcrumbs, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonIcon from "@mui/icons-material/Person";
import { PatientForm, PatientFormData } from "../components/PatientFormModal";

export const PatientCreatePage = () => {
  const handleSubmit = (data: PatientFormData) => {
    console.log("Создание пациента:", data);
  };

  return (
    <Stack spacing={3}>
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
            <PersonAddIcon fontSize="small" />
            Новый пациент
          </Typography>
        </Breadcrumbs>
        <Typography variant="h5" component="h1">
          Новый пациент
        </Typography>
      </Box>

      <Box>
        <PatientForm
          onSubmit={handleSubmit}
          mode="create"
          defaultValues={{} as PatientFormData}
        />
      </Box>
    </Stack>
  );
};
