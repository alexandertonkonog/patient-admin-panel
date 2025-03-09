import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Alert,
  Paper,
  Typography,
  Link,
} from "@mui/material";
import { useLoginMutation } from "../store/api/auth";
import { Logo } from "../components/Logo";

interface LoginFormInputs {
  login: string;
  password: string;
}

export const LoginPage = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string | null>(null);
  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      await login(data).unwrap();
      navigate("/");
    } catch {
      setLoginError("Неверный логин или пароль");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        p: 3,
      }}
    >
      <Box sx={{ alignSelf: "flex-start" }}>
        <Logo size="small" />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          flex: 1,
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 3,
            width: "100%",
            maxWidth: "360px",
            bgcolor: "background.default",
            border: 1,
            borderColor: "grey.700",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
            Вход
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ width: "100%", mb: 2 }}
          >
            {loginError && (
              <Alert severity="error" sx={{ mb: 2, py: 0 }}>
                {loginError}
              </Alert>
            )}
            <TextField
              margin="dense"
              required
              fullWidth
              id="login"
              label="Логин"
              autoComplete="username"
              size="small"
              autoFocus
              {...register("login")}
              error={!!errors.login}
              helperText={errors.login?.message}
            />
            <TextField
              margin="dense"
              required
              fullWidth
              label="Пароль"
              type="password"
              id="password"
              size="small"
              autoComplete="current-password"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <Link
              href="#"
              underline="hover"
              sx={{
                display: "block",
                mt: 1,
                fontSize: "0.875rem",
              }}
              onClick={(e) => {
                e.preventDefault();
                // Здесь будет логика для восстановления пароля
              }}
            >
              Забыли пароль?
            </Link>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="small"
              sx={{ mt: 2 }}
              disabled={!isValid || isLoading}
            >
              Войти
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};
