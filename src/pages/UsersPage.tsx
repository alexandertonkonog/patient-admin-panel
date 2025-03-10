import { Stack, Typography, Button, Box } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import { UsersTable } from "../components/UsersTable";
import { useState } from "react";
import { useRemoveUsersMutation, User } from "../store/api/users";
import { DeleteConfirmationModal } from "../components/DeleteConfirmationModal";
import { UserFormModal } from "../components/UserFormModal";

export const UsersPage = () => {
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);

  const [removeUsers, { isLoading: isDeleting }] = useRemoveUsersMutation();

  const handleDeleteSelected = () => {
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await removeUsers(selectedUsers).unwrap();
      setSelectedUsers([]);
    } catch (error) {
      console.error("Ошибка при удалении пользователей:", error);
    }
    setDeleteModalOpen(false);
  };

  const handleEditUser = (user: User) => {
    setEditingUserId(user.id);
    setFormModalOpen(true);
  };

  const handleCloseFormModal = () => {
    setFormModalOpen(false);
    setEditingUserId(null);
  };

  const hasEditingUser = editingUserId !== null;

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
          Пользователи
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          {selectedUsers.length > 0 && (
            <Button
              variant="outlined"
              color="error"
              size="small"
              startIcon={<DeleteOutlineIcon />}
              onClick={handleDeleteSelected}
            >
              Удалить выбранных пользователей
            </Button>
          )}
          <Button
            variant="contained"
            size="small"
            startIcon={<AddIcon />}
            onClick={() => setFormModalOpen(true)}
          >
            Создать пользователя
          </Button>
        </Box>
      </Box>
      <Box
        sx={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}
      >
        <UsersTable
          onSelectedChange={setSelectedUsers}
          onDeleteUsers={removeUsers}
          onEditUser={handleEditUser}
          isDeletingUsers={isDeleting}
        />
      </Box>
      <DeleteConfirmationModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title={`Удалить выбранных пользователей (${selectedUsers.length})?`}
        isLoading={isDeleting}
      />
      <UserFormModal
        open={formModalOpen}
        onClose={handleCloseFormModal}
        mode={hasEditingUser ? "edit" : "create"}
      />
    </Stack>
  );
};
