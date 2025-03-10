import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Stack,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Tooltip,
  ListItemIcon,
  ListItemText,
  Avatar,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../Logo";
import { useLogoutMutation, useLoginMutation } from "Store/api/auth";
import { logout as logoutAction } from "Store/slices/auth";
import { useTheme } from "../../theme/ThemeContext";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { UserRole, USER_ROLE_LABELS } from "Store/api/users";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "Store/store";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [roleAnchorEl, setRoleAnchorEl] = useState<null | HTMLElement>(null);
  const [logout] = useLogoutMutation();
  const [login] = useLoginMutation();
  const { mode, toggleTheme } = useTheme();
  const userRole =
    useSelector((state: RootState) => state.auth.user?.role) || UserRole.ADMIN;
  const userLogin = useSelector((state: RootState) => state.auth.user?.login);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleRoleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setRoleAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRoleClose = () => {
    setRoleAnchorEl(null);
  };

  const handleRoleChange = async (role: UserRole) => {
    if (userLogin) {
      try {
        await login({
          login: userLogin,
          password: "demo",
          role,
        }).unwrap();
        handleRoleClose();
      } catch (error) {
        console.error("Ошибка при смене роли:", error);
      }
    }
  };

  const handleUsersMenuItems = () => {
    navigate("/users");
    handleClose();
  };

  const handleLogout = async () => {
    try {
      handleClose();
      dispatch(logoutAction());
      await logout().unwrap();
      navigate("/login");
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };

  const isDarkMode = mode === "dark";

  return (
    <AppBar
      position="static"
      color="default"
      elevation={isDarkMode ? 0 : 2}
      sx={{
        bgcolor: isDarkMode ? "background.default" : "#1976d2",
        transition: "background-color 0.3s ease",
        borderBottom: isDarkMode
          ? "1px solid rgba(255, 255, 255, 0.12)"
          : "none",
      }}
    >
      <Toolbar variant="dense" sx={{ minHeight: 48 }}>
        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <Logo size="small" />
          </Link>
          <Stack direction="row" spacing={1} sx={{ ml: "auto" }}>
            <Tooltip title="Сменить роль">
              <IconButton
                size="small"
                onClick={handleRoleMenu}
                sx={{ color: "white" }}
              >
                <SwitchAccountIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={roleAnchorEl}
              open={Boolean(roleAnchorEl)}
              onClose={handleRoleClose}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              PaperProps={{
                sx: {
                  minWidth: 120,
                  "& .MuiMenuItem-root": {
                    fontSize: "0.875rem",
                    py: 0.75,
                  },
                },
              }}
            >
              {Object.values(UserRole).map((role) => (
                <MenuItem
                  key={role}
                  onClick={() => handleRoleChange(role)}
                  selected={role === userRole}
                >
                  <ListItemText>{USER_ROLE_LABELS[role]}</ListItemText>
                </MenuItem>
              ))}
            </Menu>
            <Tooltip
              title={
                isDarkMode ? "Включить светлую тему" : "Включить темную тему"
              }
            >
              <IconButton
                size="small"
                onClick={toggleTheme}
                color="inherit"
                sx={{ p: 1, color: "white" }}
              >
                {isDarkMode ? (
                  <Brightness7Icon fontSize="small" />
                ) : (
                  <Brightness4Icon fontSize="small" />
                )}
              </IconButton>
            </Tooltip>
            <IconButton
              size="small"
              onClick={handleMenu}
              sx={{ color: "white" }}
            >
              <Avatar
                sx={{
                  width: 28,
                  height: 28,
                  bgcolor: "white",
                  color: isDarkMode ? "#1a237e" : "#1976d2",
                  fontSize: "0.875rem",
                }}
              >
                АП
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              PaperProps={{
                sx: {
                  minWidth: 120,
                  "& .MuiMenuItem-root": {
                    fontSize: "0.875rem",
                    py: 0.75,
                  },
                },
              }}
            >
              {userRole === UserRole.ADMIN && (
                <MenuItem onClick={handleUsersMenuItems}>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText>Пользователи</ListItemText>
                </MenuItem>
              )}
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText>Выход</ListItemText>
              </MenuItem>
            </Menu>
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
