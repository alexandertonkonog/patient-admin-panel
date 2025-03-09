import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

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
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        elevation: 0,
        sx: { border: 1, borderColor: "grey.700" },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>Подтверждение удаления</DialogTitle>
      <DialogContent>
        <Typography>{title}</Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
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
    </Dialog>
  );
};
