import { Stack, Typography, Button, Box } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import { PatientsTable } from "../components/PatientsTable";
import { useState } from "react";
import { useRemovePatientsMutation, Patient } from "../store/api/patients";
import { DeleteConfirmationModal } from "../components/DeleteConfirmationModal";
import { useNavigate } from "react-router-dom";

export const PatientsPage = () => {
  const navigate = useNavigate();
  const [selectedPatients, setSelectedPatients] = useState<number[]>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [removePatients, { isLoading: isDeleting }] =
    useRemovePatientsMutation();

  const handleDeleteSelected = () => {
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await removePatients(selectedPatients).unwrap();
      setSelectedPatients([]);
    } catch (error) {
      console.error("Ошибка при удалении пациентов:", error);
    }
    setDeleteModalOpen(false);
  };

  const handleEditPatient = (patient: Patient) => {
    console.log(patient);
    navigate(`/patients/${patient.id}/edit`);
  };

  return (
    <Stack spacing={3} sx={{ height: "100%", flex: 1 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 500 }}>
          Пациенты
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          {selectedPatients.length > 0 && (
            <Button
              variant="outlined"
              color="error"
              size="small"
              startIcon={<DeleteOutlineIcon />}
              onClick={handleDeleteSelected}
            >
              Удалить выбранных пациентов
            </Button>
          )}
          <Button
            variant="contained"
            size="small"
            startIcon={<AddIcon />}
            onClick={() => navigate("/patients/create")}
          >
            Создать пациента
          </Button>
        </Box>
      </Box>
      <Box
        sx={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}
      >
        <PatientsTable
          onSelectedChange={setSelectedPatients}
          onDeletePatients={removePatients}
          onEditPatient={handleEditPatient}
          isDeletingPatients={isDeleting}
        />
      </Box>
      <DeleteConfirmationModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title={`Удалить выбранных пациентов (${selectedPatients.length})?`}
        isLoading={isDeleting}
      />
    </Stack>
  );
};
