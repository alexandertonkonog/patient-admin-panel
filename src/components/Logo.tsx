import { Stack, Typography } from "@mui/material";
import logoLight from "../assets/logo-light.svg";

interface LogoProps {
  size?: "small" | "medium";
}

export const Logo = ({ size = "medium" }: LogoProps) => {
  const logoSize = size === "small" ? 24 : 32;
  const variant = size === "small" ? "h6" : "h4";

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <img src={logoLight} style={{ width: logoSize, height: logoSize }} />
      <Typography
        component="span"
        variant={variant}
        sx={{
          fontWeight: 700,
          letterSpacing: 2,
          color: "white",
        }}
      >
        APP
      </Typography>
    </Stack>
  );
};
