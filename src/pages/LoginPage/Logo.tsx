import { Stack, Typography } from "@mui/material";
import logoDark from "../../assets/logo-dark.svg";
import logoLight from "../../assets/logo-light.svg";
import { useTheme } from "../../theme/ThemeContext";

interface LogoProps {
  size?: "small" | "medium";
}

export const Logo = ({ size = "medium" }: LogoProps) => {
  const logoSize = size === "small" ? 24 : 32;
  const variant = size === "small" ? "h6" : "h4";

  const { mode } = useTheme();

  const isDarkMode = mode === "dark";

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <img
        src={isDarkMode ? logoLight : logoDark}
        style={{ width: logoSize, height: logoSize }}
      />
      <Typography
        component="span"
        variant={variant}
        sx={{
          fontWeight: 700,
          letterSpacing: 2,
          color: isDarkMode ? "white" : "#1976d2",
        }}
      >
        APP
      </Typography>
    </Stack>
  );
};
