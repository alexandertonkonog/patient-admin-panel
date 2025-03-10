import { Button, DialogActions, Typography } from "@mui/material";
import { Modal } from "./Modal";

interface DeleteConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  isLoading?: boolean;
}

export const DeleteConfirmationModal = ({
  open,
  onClose,
  onConfirm,
  title,
  isLoading = false,
}: DeleteConfirmationModalProps) => {
  return (
    <Modal open={open} onClose={onClose} title="Подтверждение удаления">
      <Typography>{title}</Typography>
      <DialogActions>
        <Button onClick={onClose} size="small" disabled={isLoading}>
          Отмена
        </Button>
        <Button
          onClick={onConfirm}
          color="error"
          variant="contained"
          size="small"
          disabled={isLoading}
        >
          Удалить
        </Button>
      </DialogActions>
    </Modal>
  );
};
