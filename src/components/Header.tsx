import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Stack,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
  Tooltip,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "./Logo";
import { useLogoutMutation } from "../store/api/auth";
import { useTheme } from "../theme/ThemeContext";

const MENU_ITEMS = [
  { label: "Пациенты", path: "/" },
  { label: "Пользователи", path: "/users" },
  { label: "Вход", path: "/login" },
];

export const Header = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [logout] = useLogoutMutation();
  const { mode, toggleTheme } = useTheme();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      navigate("/login");
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };

  return (
    <AppBar position="static" color="default" elevation={2}>
      <Toolbar variant="dense" sx={{ minHeight: 48 }}>
        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
          <Logo size="small" />
          <Stack direction="row" spacing={1} sx={{ ml: 3 }}>
            {MENU_ITEMS.map((item) => (
              <Button
                key={item.path}
                component={Link}
                to={item.path}
                color="inherit"
                size="small"
              >
                {item.label}
              </Button>
            ))}
          </Stack>
          <Stack direction="row" spacing={1} sx={{ ml: "auto" }}>
            <Tooltip
              title={
                mode === "dark"
                  ? "Включить светлую тему"
                  : "Включить темную тему"
              }
            >
              <IconButton
                size="small"
                onClick={toggleTheme}
                color="inherit"
                sx={{ p: 1 }}
              >
                {mode === "dark" ? (
                  <Brightness7Icon fontSize="small" />
                ) : (
                  <Brightness4Icon fontSize="small" />
                )}
              </IconButton>
            </Tooltip>
            <IconButton size="small" onClick={handleMenu}>
              <Avatar
                sx={{
                  width: 28,
                  height: 28,
                  bgcolor: "primary.main",
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
              <MenuItem onClick={handleLogout}>Выход</MenuItem>
            </Menu>
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
