import {
  Checkbox,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Tooltip,
  Chip,
  Pagination,
  Box,
  Select,
  MenuItem,
  CircularProgress,
  SelectChangeEvent,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import { useState, useEffect } from "react";
import { useGetPatientsQuery, Patient } from "../store/api/patients";
import { DeleteConfirmationModal } from "./DeleteConfirmationModal";

interface PatientsTableProps {
  onSelectedChange: (selected: number[]) => void;
  onDeletePatients: (ids: number[]) => void;
  isDeletingPatients: boolean;
}

export const PatientsTable = ({
  onSelectedChange,
  onDeletePatients,
  isDeletingPatients,
}: PatientsTableProps) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState<number[]>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState<number | null>(null);

  const { data, isLoading, isFetching } = useGetPatientsQuery({
    page,
    perPage: rowsPerPage,
  });

  useEffect(() => {
    onSelectedChange(selected);
  }, [selected, onSelectedChange]);

  const handlePageChange = (_: unknown, newPage: number) => {
    setPage(newPage);
    setSelected([]); // Сбрасываем выбранные элементы при смене страницы
  };

  const handleRowsPerPageChange = (event: SelectChangeEvent<number>) => {
    setRowsPerPage(Number(event.target.value));
    setPage(1);
    setSelected([]); // Сбрасываем выбранные элементы при изменении количества строк
  };

  const formatDate = (dateString: string) => {
    return format(parseISO(dateString), "d MMMM yyyy, HH:mm", { locale: ru });
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked && data) {
      const newSelected = data.items.map((patient) => patient.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleDeleteClick = (e: React.MouseEvent, patientId: number) => {
    e.stopPropagation();
    setPatientToDelete(patientId);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (patientToDelete !== null) {
      onDeletePatients([patientToDelete]);
    }
    handleDeleteModalClose();
  };

  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
    setPatientToDelete(null);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  if (isLoading || !data) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
        <CircularProgress size={40} />
      </Box>
    );
  }

  const pageCount = Math.ceil(data.total / rowsPerPage);
  const patientToDeleteName = data.items.find(
    (p) => p.id === patientToDelete
  )?.name;

  return (
    <>
      <Paper
        elevation={0}
        sx={{ border: 1, borderColor: "grey.700", position: "relative" }}
      >
        {isFetching && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: "rgba(0, 0, 0, 0.1)",
              zIndex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress size={40} />
          </Box>
        )}
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    size="small"
                    indeterminate={
                      selected.length > 0 && selected.length < data.items.length
                    }
                    checked={
                      data.items.length > 0 &&
                      selected.length === data.items.length
                    }
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
                <TableCell>Имя пациента</TableCell>
                <TableCell>Последнее обновление</TableCell>
                <TableCell align="center">Статус</TableCell>
                <TableCell align="right" />
              </TableRow>
            </TableHead>
            <TableBody>
              {data.items.map((patient: Patient) => {
                const isItemSelected = isSelected(patient.id);

                return (
                  <TableRow
                    key={patient.id}
                    hover
                    onClick={() => handleClick(patient.id)}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox size="small" checked={isItemSelected} />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{patient.name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        {formatDate(patient.lastUpdate)}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        size="small"
                        label={
                          patient.isUpdating
                            ? "Редактируется"
                            : "Не редактируется"
                        }
                        color={patient.isUpdating ? "info" : undefined}
                        variant={patient.isUpdating ? "filled" : "outlined"}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Удалить">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={(e) => handleDeleteClick(e, patient.id)}
                        >
                          <DeleteOutlineIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          sx={{
            py: 1,
            px: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: 1,
            borderColor: "grey.700",
          }}
        >
          <Tooltip title="Строк на странице" placement="top">
            <Select
              size="small"
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
            </Select>
          </Tooltip>
          <Pagination
            color="primary"
            count={pageCount}
            page={page}
            onChange={handlePageChange}
            size="small"
            shape="rounded"
            showFirstButton
            showLastButton
            disabled={isFetching}
          />
        </Box>
      </Paper>
      <DeleteConfirmationModal
        open={deleteModalOpen}
        onClose={handleDeleteModalClose}
        onConfirm={handleDeleteConfirm}
        title={`Удалить ${patientToDeleteName || "пациента"}?`}
        isLoading={isDeletingPatients}
      />
    </>
  );
};
