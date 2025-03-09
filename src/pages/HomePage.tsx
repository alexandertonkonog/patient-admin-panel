import { Stack, Typography, Button, Box } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { PatientsTable } from "../components/PatientsTable";
import { useState } from "react";
import { useRemovePatientsMutation } from "../store/api/patients";
import { DeleteConfirmationModal } from "../components/DeleteConfirmationModal";

export const HomePage = () => {
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

  return (
    <Stack spacing={3}>
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
      </Box>
      <PatientsTable
        onSelectedChange={setSelectedPatients}
        onDeletePatients={removePatients}
        isDeletingPatients={isDeleting}
      />
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
