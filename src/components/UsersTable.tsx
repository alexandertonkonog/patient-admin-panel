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
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useState, useEffect } from "react";
import {
  useGetUsersQuery,
  User,
  UserRole,
  USER_ROLE_LABELS,
} from "../store/api/users";
import { DeleteConfirmationModal } from "./DeleteConfirmationModal";

interface UsersTableProps {
  onSelectedChange: (selected: number[]) => void;
  onDeleteUsers: (ids: number[]) => void;
  onEditUser: (user: User) => void;
  isDeletingUsers: boolean;
}

const getRoleColor = (role: UserRole) => {
  switch (role) {
    case UserRole.ADMIN:
      return "error";
    case UserRole.ORTHOPEDIST:
      return "warning";
    case UserRole.GNATHOLOGIST:
      return "default";
  }
};

const getRoleLabel = (role: UserRole) => {
  return USER_ROLE_LABELS[role];
};

export const UsersTable = ({
  onSelectedChange,
  onDeleteUsers,
  onEditUser,
  isDeletingUsers,
}: UsersTableProps) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState<number[]>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);

  const { data, isLoading, isFetching } = useGetUsersQuery({
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

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked && data) {
      const newSelected = data.items.map((user) => user.id);
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

  const handleDeleteClick = (e: React.MouseEvent, userId: number) => {
    e.stopPropagation();
    setUserToDelete(userId);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (userToDelete !== null) {
      onDeleteUsers([userToDelete]);
    }
    handleDeleteModalClose();
  };

  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
    setUserToDelete(null);
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
  const userToDeleteName = data.items.find(
    (u) => u.id === userToDelete
  )?.firstName;

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          border: 1,
          borderColor: "grey.700",
          position: "relative",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
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
        <TableContainer sx={{ flex: 1, overflow: "auto" }}>
          <Table size="small" stickyHeader>
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
                <TableCell>Имя пользователя</TableCell>
                <TableCell>Роль</TableCell>
                <TableCell align="center">Статус</TableCell>
                <TableCell align="right" />
              </TableRow>
            </TableHead>
            <TableBody>
              {data.items.map((user: User) => {
                const isItemSelected = isSelected(user.id);

                return (
                  <TableRow
                    key={user.id}
                    hover
                    onClick={() => handleClick(user.id)}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox size="small" checked={isItemSelected} />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {user.firstName} {user.lastName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        size="small"
                        label={getRoleLabel(user.role)}
                        color={getRoleColor(user.role)}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        size="small"
                        label={user.isActive ? "Активирован" : "Не активирован"}
                        color={user.isActive ? "success" : undefined}
                        variant={user.isActive ? "filled" : "outlined"}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <Tooltip title="Редактировать">
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              onEditUser(user);
                            }}
                          >
                            <EditOutlinedIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Удалить">
                          <IconButton
                            size="small"
                            color="error"
                            onClick={(e) => handleDeleteClick(e, user.id)}
                          >
                            <DeleteOutlineIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
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
            bgcolor: "background.paper",
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
        title={`Удалить ${userToDeleteName || "пользователя"}?`}
        isLoading={isDeletingUsers}
      />
    </>
  );
};
